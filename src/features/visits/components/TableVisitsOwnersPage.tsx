import type { VisitWithRelations } from "../../../types/VisitWithRelations";
import { useOwners } from "../../owners/hooks/useOwners";
// import { usePetsByOwner } from "../../pets/hooks/usePetsByOwner";

interface Props {
  visits: VisitWithRelations[];
  handleSelectVisit: (visit: VisitWithRelations) => void;
  selectedVisit: VisitWithRelations | null;
}

export default function TableVisitsOwnersPage({
  visits,
  handleSelectVisit,
  selectedVisit,
}: Props) {
  const { handleSelectOwnerById } = useOwners();
  // const { handleSelectPetById } = usePetsByOwner();

  const emptyRows = 8;

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  return (
    <div>
      <p className=" text-red-800 font-bold">
        Total de visitas: {visits.length}
      </p>
      <div className="w-[900px] h-[250px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50 text-ellipsis">
          <thead>
            <tr>
              <th className="w-[2.5%] border border-gray-900 px-2 py-0.5"></th>
              <th className="w-[7%] border border-gray-900 px-2 py-0.5">
                Visita
              </th>
              <th className="w-[8%] border border-gray-900 px-2 py-0.5">
                Factura
              </th>
              <th className="w-[9%] border border-gray-900 px-2 py-0.5">
                Fecha
              </th>
              <th className="w-[10%] border border-gray-900 px-2 py-0.5">
                Mascota
              </th>
              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                Propietario
              </th>
              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                Motivo
              </th>
              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                Médico
              </th>
              <th className="w-[3%] border border-gray-900 px-2 py-0.5">H</th>
              <th className="w-[3%] border border-gray-900 px-2 py-0.5">Ex</th>
              <th className="w-[3%] border border-gray-900 px-2 py-0.5">Ref</th>
            </tr>
          </thead>

          <tbody>
            {visits
              // .sort((a, b) => a.id - b.id)
              .map((visit) => (
                <tr
                  key={visit.id}
                  // ref={(el) => void (rowRefs.current[index] = el)}
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
                  <td className="border border-gray-900 px-1 py-0.5">{`${visit.ownerSurname} ${visit.ownerName}`}</td>
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

            {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map(
              (_, i) => (
                <tr key={`empty-${i}`}>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
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
      <div className="flex flex-row gap-8 items-center">
        <div className="mt-2">
          <p className="text-blue-900 font-bold">Buscar N. de Visita</p>
          <input className="bg-amber-50 border border-gray-700"></input>
        </div>
        <p className="text-blue-900 font-bold">Ver Visitas</p>
        <div className="flex flex-row gap-8 bg-blue-50 py-1 px-5">
          <label className="flex gap-1.5 text-blue-900 font-bold">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="scale-120"
            />
            Hoy
          </label>
          <label className="flex gap-1.5 text-blue-900 font-bold">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="scale-120"
            />
            Por fecha
          </label>
          <label className="flex gap-1.5 text-blue-900 font-bold">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="scale-120"
            />
            Todas
          </label>
        </div>
      </div>
    </div>
  );
}
