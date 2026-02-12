export default function TableOwners({ owners, handleSelect }) {
  return (
    <div>
      <table border="1" cellPadding="10" className="bg-amber-50">
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
                {owner.cedula}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
