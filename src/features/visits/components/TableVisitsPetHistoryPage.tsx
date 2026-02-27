import { useRef, useState, useMemo } from "react";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";
import { usePetsContext } from "../../pets/context/PetsContext";
import { useVisitsContext } from "../context/VisitsContext";
import { useVisitsByPet } from "../hooks/useVisitsByPet";

interface Props {
  handleSelectVisit: (visit: VisitWithRelations) => void;
}

export default function TableVisitsPetHistoryPage({
  handleSelectVisit,
}: Props) {
  const { selectedVisit } = useVisitsContext();
  const { selectedPet } = usePetsContext();
  const { visitsByPet } = useVisitsByPet(selectedPet?.id ?? null);

  const emptyRows = 9 - visitsByPet.length;

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  // Estado de ordenamiento
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VisitWithRelations;
    direction: "asc" | "desc";
  }>({ key: "visitDate", direction: "asc" });

  // Función para cambiar la columna y la dirección de orden
  const handleSort = (key: keyof VisitWithRelations) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Lista ordenada memorizada
  const sortedVisits = useMemo(() => {
    const sorted = [...visitsByPet];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      // Números
      if (typeof aValue === "number" && typeof bValue === "number") {
        return aValue - bValue;
      }

      // Strings
      if (typeof aValue === "string" && typeof bValue === "string") {
        // Verifica si es fecha en string
        const aDate = Date.parse(aValue);
        const bDate = Date.parse(bValue);

        if (!isNaN(aDate) && !isNaN(bDate)) {
          return aDate - bDate; // compara como fechas
        }

        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      }

      return 0;
    });

    if (direction === "desc") sorted.reverse();
    return sorted;
  }, [visitsByPet, sortConfig]);

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  // Navegación con teclado
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!sortedVisits.length) return;

    const currentIndex = sortedVisits.findIndex(
      (o) => o.id === selectedVisit?.id,
    );

    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, sortedVisits.length - 1);
      if (nextIndex !== currentIndex) {
        handleSelectVisit(sortedVisits[nextIndex]);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0);
      if (prevIndex !== currentIndex) {
        handleSelectVisit(sortedVisits[prevIndex]);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-blue-800 font-bold">Visitas:</p>
      <div
        className="w-[700px] h-[250px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed text-ellipsis">
          <thead>
            <tr>
              <th className="w-[5%] border border-gray-900 px-2 py-0.5"></th>

              <th
                onClick={() => handleSort("visitDate")}
                className="w-[20%] border border-gray-900 px-2 py-0.5 cursor-pointer hover:bg-amber-200 select-none"
              >
                Fecha{" "}
                {sortConfig.key === "visitDate"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() => handleSort("procedure")}
                className="w-[40%] border border-gray-900 px-2 py-0.5 cursor-pointer hover:bg-amber-200 select-none"
              >
                Procedimiento{" "}
                {sortConfig.key === "procedure"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() => handleSort("invoiceNumber")}
                className="w-[20%] border border-gray-900 px-2 py-0.5 cursor-pointer hover:bg-amber-200 select-none"
              >
                Factura N.{" "}
                {sortConfig.key === "invoiceNumber"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() => handleSort("totalAmount")}
                className="w-[20%] border border-gray-900 px-2 py-0.5 cursor-pointer hover:bg-amber-200 select-none"
              >
                Monto{" "}
                {sortConfig.key === "totalAmount"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedVisits.map((visit, index) => (
              <tr
                key={visit.id}
                ref={(el) => void (rowRefs.current[index] = el)}
                onClick={() => handleSelectVisit(visit)}
                className={`cursor-pointer hover:bg-amber-200 ${
                  selectedVisit?.id === visit.id ? "bg-amber-300" : ""
                }`}
              >
                <td className="border border-gray-900 pl-1.5 py-0.5">
                  {selectedVisit?.id === visit.id ? "➤" : ""}
                </td>

                <td className="border border-gray-900 px-1 py-0.5">
                  {formattedDate(visit.visitDate)}
                </td>

                <td className="border border-gray-900 px-1 py-0.5">
                  {visit.procedure}
                </td>
                <td className="border border-gray-900 px-1 py-0.5">
                  {visit.invoiceNumber}
                </td>
                <td className="border border-gray-900 px-1 py-0.5">
                  {visit.totalAmount}
                </td>
              </tr>
            ))}

            {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map(
              (_, i) => (
                <tr key={`empty-${i}`}>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
