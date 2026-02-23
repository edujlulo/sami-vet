export default function TableVisitsPetHistoryPage() {
  const emptyRows = 8;

  return (
    <div className="flex flex-col gap-2">
      <p className=" text-blue-800 font-bold">Visitas:</p>
      <div className="w-[700px] h-[250px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50 text-ellipsis">
          <thead>
            <tr>
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
            {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map(
              (_, i) => (
                <tr key={`empty-${i}`}>
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
