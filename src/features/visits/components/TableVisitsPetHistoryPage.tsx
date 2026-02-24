import { useRef } from "react";
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

  const emptyRows = 8;

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  // Function for navigation in table with keyboard
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!visitsByPet.length) return;

    // Encuentra la fila actualmente seleccionada
    const currentIndex = visitsByPet.findIndex(
      (o) => o.id === selectedVisit?.id
    );

    // Arrow Down
    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, visitsByPet.length - 1); // nunca pasa del último
      if (nextIndex !== currentIndex) {
        handleSelectVisit(visitsByPet[nextIndex]);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }

    // Arrow Up
    else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0); // nunca pasa del primero
      if (prevIndex !== currentIndex) {
        handleSelectVisit(visitsByPet[prevIndex]);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <p className=" text-blue-800 font-bold">Visitas:</p>
      <div
        className="w-[700px] h-[250px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0} // allow the div to receive focus
        onKeyDown={(e) => handleKeyNavigation(e)}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50 text-ellipsis">
          <thead>
            <tr>
              <th className="w-[5%] border border-gray-900 px-2 py-0.5"></th>
              <th className="w-[20%] border border-gray-900 px-2 py-0.5">
                Fecha
              </th>
              <th className="w-[40%] border border-gray-900 px-2 py-0.5">
                Procedimiento
              </th>
              <th className="w-[20%] border border-gray-900 px-2 py-0.5">
                Factura N.
              </th>
              <th className="w-[20%] border border-gray-900 px-2 py-0.5">
                Monto
              </th>
            </tr>
          </thead>

          <tbody>
            {visitsByPet
              // .sort((a, b) => a.id - b.id)
              .map((visit, index) => (
                <tr
                  key={visit.id}
                  ref={(el) => void (rowRefs.current[index] = el)}
                  onClick={() => {
                    handleSelectVisit(visit);
                  }}
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
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
