import { useState, useRef } from "react";
import type { VisitEntity } from "../../../types/VisitEntity";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";
import { useOwners } from "../../owners/hooks/useOwners";
import FiltersTableVisitsOwnersPage from "./FiltersTableVisitsOwnersPage";
import {
  fetchVisitsService,
  fetchVisitsByDate,
} from "../services/visitsService";
import { useTranslation } from "react-i18next";

interface Props {
  handleSelectVisit: (visit: VisitWithRelations) => void;
  selectedVisit: VisitEntity | null;
}

export default function TableVisitsOwnersPage({
  handleSelectVisit,
  selectedVisit,
}: Props) {
  const { t } = useTranslation("visits");

  const { handleSelectOwnerById } = useOwners();

  // 🔹 STATE VISITS (ahora vive aquí)
  const [visits, setVisits] = useState<VisitWithRelations[]>([]);
  const [loading, setLoading] = useState(false);

  const emptyRows = 11 - visits.length;

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  // ================= LOAD ALL =================
  const loadVisitsAll = async () => {
    try {
      setLoading(true);
      const data = await fetchVisitsService();
      setVisits(data);
    } catch (error) {
      console.error("Error loading visits:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD BY DATE =================
  const loadVisitsByDate = async (date: string) => {
    try {
      setLoading(true);
      const data = await fetchVisitsByDate(date);
      setVisits(data);
    } catch (error) {
      console.error("Error loading visits by date:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD TODAY =================
  const loadVisitsToday = async () => {
    const today = new Date().toISOString().split("T")[0];
    await loadVisitsByDate(today);
  };

  // ================= HANDLE FILTER =================
  const handleFilterChange = (
    filter: "today" | "byDate" | "all",
    date?: string,
  ) => {
    if (filter === "today") {
      loadVisitsToday();
    } else if (filter === "byDate" && date) {
      loadVisitsByDate(date);
    } else {
      loadVisitsAll();
    }
  };

  // Function for navigation in table with keyboard
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!visits.length) return;

    // Encuentra la fila actualmente seleccionada
    const currentIndex = visits.findIndex((o) => o.id === selectedVisit?.id);

    // Arrow Down
    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, visits.length - 1); // nunca pasa del último
      if (nextIndex !== currentIndex) {
        handleSelectVisit(visits[nextIndex]);
        handleSelectOwnerById(visits[nextIndex].ownerId);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }

    // Arrow Up
    else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0); // nunca pasa del primero
      if (prevIndex !== currentIndex) {
        handleSelectVisit(visits[prevIndex]);
        handleSelectOwnerById(visits[prevIndex].ownerId);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  return (
    <div>
      <div className="flex flex-row gap-5">
        <p className="text-red-800 font-bold">
          {t("totalVisits")}: {visits.length}
        </p>

        {loading && (
          <p className="text-blue-800 font-bold">{t("loadingVisits")}</p>
        )}
      </div>

      <div
        className="w-[900px] h-[250px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0}
        onKeyDown={(e) => handleKeyNavigation(e)}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed text-ellipsis">
          <thead>
            <tr>
              <th className="w-[2.5%] border border-gray-900 px-2 py-0.5"></th>

              <th className="w-[7%] border border-gray-900 px-2 py-0.5">
                {t("visit")}
              </th>

              <th className="w-[8%] border border-gray-900 px-2 py-0.5">
                {t("invoice")}
              </th>

              <th className="w-[9%] border border-gray-900 px-2 py-0.5">
                {t("date")}
              </th>

              <th className="w-[10%] border border-gray-900 px-2 py-0.5">
                {t("pet")}
              </th>

              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                {t("owner")}
              </th>

              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                {t("reason")}
              </th>

              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                {t("vet")}
              </th>

              <th className="w-[3%] border border-gray-900 px-2 py-0.5">
                {t("historyShort")}
              </th>

              <th className="w-[3%] border border-gray-900 px-2 py-0.5">
                {t("examinationShort")}
              </th>

              <th className="w-[3%] border border-gray-900 px-2 py-0.5">
                {t("referredShort")}
              </th>
            </tr>
          </thead>

          <tbody>
            {visits
              .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
              .map((visit, index) => (
                <tr
                  key={visit.id}
                  ref={(el) => void (rowRefs.current[index] = el)}
                  onClick={() => {
                    handleSelectVisit(visit);
                    handleSelectOwnerById(visit.ownerId);
                  }}
                  className={`cursor-pointer hover:bg-amber-200 ${
                    selectedVisit?.id === visit.id ? "bg-amber-300" : ""
                  }`}
                >
                  <td className="border border-gray-900 pl-1.5 py-0.5">
                    {selectedVisit?.id === visit.id ? "➤" : ""}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.id}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.invoiceNumber}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {formattedDate(visit.visitDate)}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.petName}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.ownerSurname} {visit.ownerName}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.procedure}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.vet}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.h}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.ex}
                  </td>

                  <td className="border border-gray-900 px-1 py-0.5">
                    {visit.referredBy}
                  </td>
                </tr>
              ))}

            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array.from({ length: 11 }).map((__, j) => (
                  <td key={j} className="border border-gray-900 px-2 py-0.5">
                    &nbsp;
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row gap-8 items-center">
        <div className="mt-2">
          <p className="text-blue-900 font-bold">{t("searchVisitNumber")}</p>
          <input className="bg-amber-50 border border-gray-700" />
        </div>

        <p className="text-blue-900 font-bold">{t("viewVisits")}</p>

        <FiltersTableVisitsOwnersPage onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}
