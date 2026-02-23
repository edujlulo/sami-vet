import type { Visit } from "../../../types/Visit";

interface Props {
  visits: Visit[];
}

export default function TableVisitsOwnersPage({ visits }: Props) {
  const emptyRows = 8;

  return (
    <div>
      <p className=" text-red-800 font-bold">
        Total de visitas: {visits.length}
      </p>
      <div className="w-[700px] h-[250px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50">
          <thead>
            <tr>
              <th className="w-[10%] border border-gray-900 px-2 py-0.5">
                Visita
              </th>
              <th className="w-[12%] border border-gray-900 px-2 py-0.5">
                Factura
              </th>
              <th className="w-[10%] border border-gray-900 px-2 py-0.5">
                Fecha
              </th>
              <th className="w-[15%] border border-gray-900 px-2 py-0.5">
                Mascota
              </th>
              <th className="w-[16%] border border-gray-900 px-2 py-0.5">
                Propietario
              </th>
              <th className="w-[10%] border border-gray-900 px-2 py-0.5">
                Motivo
              </th>
              <th className="w-[12%] border border-gray-900 px-2 py-0.5">
                Médico
              </th>
              <th className="w-[5%] border border-gray-900 px-2 py-0.5">H</th>
              <th className="w-[5%] border border-gray-900 px-2 py-0.5">Ex</th>
              <th className="w-[5%] border border-gray-900 px-2 py-0.5">Ref</th>
            </tr>
          </thead>

          <tbody>
            {visits
              // .sort((a, b) => a.id - b.id)
              .map((visit) => (
                <tr
                  key={visit.id}
                  // ref={(el) => void (rowRefs.current[index] = el)}
                  // onClick={() => handleSelect(owner)}
                  // className={`cursor-pointer hover:bg-amber-200 ${
                  //   selectedOwner?.id === owner.id ? "bg-amber-300" : ""
                  // }`}
                >
                  {/* <td className="border border-gray-900 pl-1.5 py-0.5">
                    {selectedVisit?.id === visit.id ? "➤" : ""}
                  </td> */}

                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.id}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.invoiceNumber}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.visitDate}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">TBC</td>
                  <td className="border border-gray-900 px-2 py-0.5">TBC</td>
                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.procedure}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.vet}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.h}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">
                    {visit.ex}
                  </td>
                  <td className="border border-gray-900 px-2 py-0.5">
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
