// Outstanding payments table in OwnersPage.tsx

export default function TableOutstandingPayments() {
  const paymentsEmptyRows = 3;

  return (
    <div>
      {/* Outstanding payments table */}
      <p className="flex items-center justify-center text-blue-900 font-bold">
        Cuentas por cobrar
      </p>
      <div className="w-[290px] h-[118px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50">
          <thead>
            <tr>
              <th className="w-[33%] border border-gray-900 px-2 py-0.5">
                Fact.
              </th>
              <th className="w-[33%] border border-gray-900 px-2 py-0.5">
                Fecha
              </th>
              <th className="w-[33%] border border-gray-900 px-2 py-0.5">
                Montcxco
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({
              length: paymentsEmptyRows > 0 ? paymentsEmptyRows : 0,
            }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
