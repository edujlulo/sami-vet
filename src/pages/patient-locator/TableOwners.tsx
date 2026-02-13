import type { Owner } from "../../types/Owner";

interface TableOwnersProps {
  owners: Owner[];
  handleSelect: (owner: Owner) => void;
}

export default function TableOwners({
  owners,
  handleSelect,
}: TableOwnersProps) {
  return (
    <div>
      <table className="bg-amber-50 border border-gray-900">
        <thead>
          <tr>
            <th className="border border-gray-900 px-2 py-0.5">Código</th>
            <th className="border border-gray-900 px-2 py-0.5">Nombre</th>
            <th className="border border-gray-900 px-2 py-0.5">Email</th>
            <th className="border border-gray-900 px-2 py-0.5">Cédula</th>
          </tr>
        </thead>

        <tbody>
          {owners.map((owner) => (
            <tr
              key={owner.id}
              onClick={() => handleSelect(owner)}
              className="cursor-pointer hover:bg-amber-200"
            >
              <td className="border border-gray-900 px-2 py-0.5">{owner.id}</td>
              <td className="border border-gray-900 px-2 py-0.5">
                {owner.name}
              </td>
              <td className="border border-gray-900 px-2 py-0.5">
                {owner.email}
              </td>
              <td className="border border-gray-900 px-2 py-0.5">
                {owner.idCardNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
