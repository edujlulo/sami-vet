import { useRef, useState } from "react";
import type { Owner } from "../../../types/Owner";

interface Props {
  owners: Owner[];
  handleSelect: (owner: Owner) => void;
  selectedOwner: Owner;
}

export default function TableOwners({
  owners,
  handleSelect,
  selectedOwner,
}: Props) {
  const emptyRows = 8 - owners.length;

  /* ================= SORT ================= */

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Owner | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  function handleSort(key: keyof Owner) {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  }

  const sortedOwners = [...owners].sort((a, b) => {
    if (!sortConfig.key) return a.id - b.id;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  /* ================= RESIZE ================= */

  const [columnWidths, setColumnWidths] = useState({
    id: 90,
    surname: 200,
    name: 200,
    idCardNumber: 150,
  });

  const resizingColumn = useRef<keyof typeof columnWidths | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  function handleMouseDown(
    e: React.MouseEvent,
    column: keyof typeof columnWidths,
  ) {
    resizingColumn.current = column;
    startX.current = e.clientX;
    startWidth.current = columnWidths[column];

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!resizingColumn.current) return;

    const delta = e.clientX - startX.current;
    const newWidth = Math.max(60, startWidth.current + delta);

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

  /* ================= KEYBOARD NAV ================= */

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!sortedOwners.length) return;

    const currentIndex = sortedOwners.findIndex(
      (o) => o.id === selectedOwner?.id,
    );

    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, sortedOwners.length - 1);
      if (nextIndex !== currentIndex) {
        handleSelect(sortedOwners[nextIndex]);
        rowRefs.current[nextIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0);
      if (prevIndex !== currentIndex) {
        handleSelect(sortedOwners[prevIndex]);
        rowRefs.current[prevIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
      e.preventDefault();
    }
  }

  /* ================= UI ================= */

  function renderSortArrow(key: keyof Owner) {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  }

  function Resizer({ column }: { column: keyof typeof columnWidths }) {
    return (
      <div
        onMouseDown={(e) => handleMouseDown(e, column)}
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
      />
    );
  }

  return (
    <div>
      <div
        className="w-[675px] h-[250px] overflow-y-auto border border-gray-900 rounded-md focus-within:ring-3 focus-within:ring-blue-300"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <table className="bg-amber-50 w-full table-fixed border-separate border-spacing-0">
          <thead className="sticky top-0 bg-amber-50 z-10">
            <tr>
              <th className="w-[28px] border-b border-r border-gray-900 px-2 py-0.5"></th>

              <th
                style={{ width: columnWidths.id }}
                onClick={() => handleSort("id")}
                className="relative select-none cursor-pointer border-b border-r border-gray-900 px-2 py-0.5"
              >
                Código{renderSortArrow("id")}
                <Resizer column="id" />
              </th>

              <th
                style={{ width: columnWidths.surname }}
                onClick={() => handleSort("surname")}
                className="relative select-none cursor-pointer border-b border-r border-gray-900 px-2 py-0.5"
              >
                Apellidos{renderSortArrow("surname")}
                <Resizer column="surname" />
              </th>

              <th
                style={{ width: columnWidths.name }}
                onClick={() => handleSort("name")}
                className="relative select-none cursor-pointer border-b border-r border-gray-900 px-2 py-0.5"
              >
                Nombres{renderSortArrow("name")}
                <Resizer column="name" />
              </th>

              <th
                style={{ width: columnWidths.idCardNumber }}
                onClick={() => handleSort("idCardNumber")}
                className="relative select-none cursor-pointer border-b border-gray-900 px-2 py-0.5"
              >
                Cédula{renderSortArrow("idCardNumber")}
                <Resizer column="idCardNumber" />
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedOwners.map((owner, index) => (
              <tr
                key={owner.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                onClick={() => handleSelect(owner)}
                className={`cursor-pointer hover:bg-amber-200 ${
                  selectedOwner?.id === owner.id ? "bg-amber-300" : ""
                }`}
              >
                <td className="border-b border-r border-gray-900 pl-1.5 py-0.5">
                  {selectedOwner?.id === owner.id ? "➤" : ""}
                </td>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  {owner.id}
                </td>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  {owner.surname}
                </td>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  {owner.name}
                </td>
                <td className="border-b border-gray-900 px-2 py-0.5">
                  {owner.idCardNumber}
                </td>
              </tr>
            ))}

            {Array.from({
              length: emptyRows > 0 ? emptyRows : 0,
            }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  &nbsp;
                </td>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  &nbsp;
                </td>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  &nbsp;
                </td>
                <td className="border-b border-r border-gray-900 px-2 py-0.5">
                  &nbsp;
                </td>
                <td className="border-b border-gray-900 px-2 py-0.5">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <p className="text-blue-900 font-bold">Buscar propietario</p>
        <input className="bg-amber-50 border border-gray-700" />
      </div>
    </div>
  );
}
