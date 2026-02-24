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

  return (
    <div className="flex flex-col gap-2">
      <p className=" text-blue-800 font-bold">Visitas:</p>
      <div className="w-[700px] h-[250px] overflow-y-auto border border-gray-900">
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
              .map((visit) => (
                <tr
                  key={visit.id}
                  // ref={(el) => void (rowRefs.current[index] = el)}
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
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
