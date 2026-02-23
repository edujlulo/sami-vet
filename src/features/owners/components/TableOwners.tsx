import { useRef } from "react";
import type { Owner } from "../../../types/Owner";

interface Props {
  owners: Owner[];
  handleSelect: (owner: Owner) => void;
  selectedOwner: Owner;
}

export default function TableOwners({
  owners,
  handleSelect,
  selectedOwner,
}: Props) {
  const emptyRows = 8 - owners.length;

  // Function for navigation in table with keyboard
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!owners.length) return;

    // Encuentra la fila actualmente seleccionada
    const currentIndex = owners.findIndex((o) => o.id === selectedOwner?.id);

    // Arrow Down
    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, owners.length - 1); // nunca pasa del último
      if (nextIndex !== currentIndex) {
        handleSelect(owners[nextIndex]);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }

    // Arrow Up
    else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0); // nunca pasa del primero
      if (prevIndex !== currentIndex) {
        handleSelect(owners[prevIndex]);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  return (
    <div>
      <div
        className="w-[675px] h-[250px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0} // allow the div to receive focus
        onKeyDown={(e) => handleKeyNavigation(e)}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50 text-ellipsis">
          <thead>
            <tr>
              <th className="w-[4%] border border-gray-900 px-2 py-0.5"></th>
              <th className="w-[14%] border border-gray-900 px-2 py-0.5">
                Código
              </th>
              <th className="w-[31%] border border-gray-900 px-2 py-0.5">
                Apellidos
              </th>
              <th className="w-[31%] border border-gray-900 px-2 py-0.5">
                Nombres
              </th>
              <th className="w-[20%] border border-gray-900 px-2 py-0.5">
                Cédula
              </th>
            </tr>
          </thead>

          <tbody>
            {owners
              .sort((a, b) => a.id - b.id)
              .map((owner, index) => (
                <tr
                  key={owner.id}
                  ref={(el) => void (rowRefs.current[index] = el)}
                  onClick={() => handleSelect(owner)}
                  className={`cursor-pointer hover:bg-amber-200 ${
                    selectedOwner?.id === owner.id ? "bg-amber-300" : ""
                  }`}
                >
                  <td className="border border-gray-900 pl-1.5 py-0.5">
                    {selectedOwner?.id === owner.id ? "➤" : ""}
                  </td>
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
