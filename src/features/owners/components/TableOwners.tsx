import type { Owner } from "../../../types/Owner";

interface TableOwnersProps {
  owners: Owner[];
  handleSelect: (owner: Owner) => void;
}

export default function TableOwners({
  owners,
  handleSelect,
}: TableOwnersProps) {
  const emptyRows = 8 - owners.length;

  return (
    <div>
      <div className="w-[640px] h-[250px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50">
          <thead>
            <tr>
              <th className="w-[14%] border border-gray-900 px-2 py-0.5">
                Código
              </th>
              <th className="w-[33%] border border-gray-900 px-2 py-0.5">
                Apellidos
              </th>
              <th className="w-[33%] border border-gray-900 px-2 py-0.5">
                Nombres
              </th>
              <th className="w-[20%] border border-gray-900 px-2 py-0.5">
                Cédula
              </th>
            </tr>
          </thead>

          <tbody>
            {owners.map((owner) => (
              <tr
                key={owner.id}
                onClick={() => handleSelect(owner)}
                className="cursor-pointer hover:bg-amber-200"
              >
                <td className="border border-gray-900 px-2 py-0.5">
                  {owner.id}
                </td>
                <td className="border border-gray-900 px-2 py-0.5">
                  {owner.surname}
                </td>
                <td className="border border-gray-900 px-2 py-0.5">
                  {owner.name}
                </td>
                <td className="border border-gray-900 px-2 py-0.5">
                  {owner.idCardNumber}
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
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <p className="text-blue-900 font-bold">Buscar propietario</p>
        <input className="bg-amber-50 border border-gray-700"></input>
      </div>
    </div>
  );
}
