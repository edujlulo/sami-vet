import { useEffect, useRef, useState } from "react";
import type { VisitEntity } from "../../../types/VisitEntity";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";
import { useOwners } from "../../owners/hooks/useOwners";
import FiltersTableVisitsOwnersPage from "./FiltersTableVisitsOwnersPage";

import { useTranslation } from "react-i18next";

interface Props {
  handleSelectVisit: (visit: VisitWithRelations) => void;
  selectedVisit: VisitEntity | null;
  visits: VisitWithRelations[];
  loading: boolean;
  handleFilterChange: (
    filter: "today" | "byDate" | "all",
    date?: string,
  ) => void;
}

export default function TableVisitsOwnersPage({
  handleSelectVisit,
  selectedVisit,
  visits,
  loading,
  handleFilterChange,
}: Props) {
  const { t } = useTranslation("visits");

  const { handleSelectOwnerById } = useOwners();

  const emptyRows = 11 - visits.length;

  // ===================== Formateo de fecha =====================
  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  // ===================== SORT =====================
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VisitWithRelations | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  function handleSort(key: keyof VisitWithRelations) {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  const sortedVisits = [...visits].sort((a, b) => {
    if (!sortConfig.key) {
      if (a.id === undefined) return 1;
      if (b.id === undefined) return -1;
      return a.id - b.id;
    }

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // undefined al final
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // ===================== RESIZE =====================
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    id: 50,
    invoiceNumber: 80,
    visitDate: 70,
    petName: 120,
    ownerSurname: 150,
    procedure: 150,
    vet: 100,
  });

  const resizingColumn = useRef<string | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  function handleMouseDown(e: React.MouseEvent, column: string) {
    resizingColumn.current = column;
    startX.current = e.clientX;
    startWidth.current = columnWidths[column];

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!resizingColumn.current) return;

    const delta = e.clientX - startX.current;
    const newWidth = Math.max(20, startWidth.current + delta);

    setColumnWidths((prev) => ({
      ...prev,
      [resizingColumn.current!]: newWidth,
    }));
  }

  function handleMouseUp() {
    resizingColumn.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  // ===================== Render arrow sort =====================
  function renderSortArrow(key: keyof VisitWithRelations) {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  }

  function Resizer({ column }: { column: string }) {
    return (
      <div
        onMouseDown={(e) => handleMouseDown(e, column)}
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
      />
    );
  }

  // ===================== Navigation with keyboard =====================
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!visits.length) return;

    const currentIndex = visits.findIndex((o) => o.id === selectedVisit?.id);

    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, visits.length - 1);
      if (nextIndex !== currentIndex) {
        handleSelectVisit(visits[nextIndex]);
        handleSelectOwnerById(visits[nextIndex].ownerId);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0);
      if (prevIndex !== currentIndex) {
        handleSelectVisit(visits[prevIndex]);
        handleSelectOwnerById(visits[prevIndex].ownerId);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  // ========== Auto scroll when change selectedOwner ==========
  useEffect(() => {
    if (!selectedVisit) return;

    const index = sortedVisits.findIndex((o) => o.id === selectedVisit.id);
    if (index === -1) return;

    const row = rowRefs.current[index];
    const container = row?.closest("div"); // tu div scrollable

    if (row && container) {
      const containerTop = container.getBoundingClientRect().top;
      const rowTop = row.getBoundingClientRect().top;

      const stickyOffset = 25; // <- altura de tu sticky header en px (ajusta según tu CSS)
      container.scrollTop += rowTop - containerTop - stickyOffset;
    }
  }, [selectedVisit, sortedVisits]);

  // ===================== UI =====================
  return (
    <div>
      {/* Status */}
      <div className="flex flex-row gap-5">
        <p className="text-red-800 font-bold">
          {t("totalVisits")}: {visits.length}
        </p>
        {loading && (
          <p className="text-blue-800 font-bold">{t("loadingVisits")}</p>
        )}
      </div>
      {/* Table */}
      <div
        className="w-[900px] h-[250px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md relative"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <table className="bg-amber-50  w-full border-separate border-spacing-0 text-ellipsis relative">
          <thead className="sticky top-0 bg-amber-50 z-10">
            <tr>
              <th className="w-[2.5%] border-b border-r border-gray-900 px-2 py-0.5"></th>

              {[
                { key: "id", label: t("visit") },
                { key: "invoiceNumber", label: t("invoiceNumber") },
                { key: "visitDate", label: t("date") },
                { key: "petName", label: t("pet") },
                { key: "ownerSurname", label: t("owner") },
                { key: "procedure", label: t("reason") },
                { key: "vet", label: t("vet") },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() =>
                    handleSort(col.key as keyof VisitWithRelations)
                  }
                  style={{ width: columnWidths[col.key] }}
                  className="border-b border-r border-gray-900 px-2 py-0.5 relative cursor-pointer select-none"
                >
                  {col.label}
                  {renderSortArrow(col.key as keyof VisitWithRelations)}
                  <Resizer column={col.key} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedVisits.map((visit, index) => (
              <tr
                key={visit.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                onClick={() => {
                  handleSelectVisit(visit);
                  handleSelectOwnerById(visit.ownerId);
                }}
                className={`cursor-pointer hover:bg-amber-200 ${
                  selectedVisit?.id === visit.id ? "bg-amber-300" : ""
                }`}
              >
                <td className="border-b border-r border-gray-900 pl-1.5 py-0.5">
                  {selectedVisit?.id === visit.id ? "➤" : ""}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {visit.id}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {visit.invoiceNumber}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {formattedDate(visit.visitDate)}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {visit.petName}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {visit.ownerSurname} {visit.ownerName}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {visit.procedure}
                </td>
                <td className="border-b border-r border-gray-900 px-1 py-0.5">
                  {visit.vet}
                </td>
              </tr>
            ))}

            {/* Empty rows */}
            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array.from({ length: 8 }).map((__, j) => (
                  <td
                    key={j}
                    className="border-b border-r border-gray-900 px-2 py-0.5"
                  >
                    &nbsp;
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Filters */}
      <div className="flex flex-row gap-8 items-center">
        {" "}
        <div className="mt-2">
          {" "}
          <p className="text-blue-900 font-bold">
            {t("searchVisitNumber")}
          </p>{" "}
          <input className="bg-amber-50 border border-gray-700" />{" "}
        </div>{" "}
        <p className="text-blue-900 font-bold">{t("viewVisits")}</p>{" "}
        <FiltersTableVisitsOwnersPage
          handleFilterChange={handleFilterChange}
        />{" "}
      </div>{" "}
    </div>
  );
}
