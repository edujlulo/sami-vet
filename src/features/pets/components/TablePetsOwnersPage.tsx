import { useRef } from "react";
import type { Owner } from "../../../types/Owner";
import type { Pet } from "../../../types/Pet";
import { usePetsByOwner } from "../hooks/usePetsByOwner";

type Props = {
  selectedOwner: Owner;
  handleSelectPet: (pet: Pet) => void;
  selectedPet: Pet | null;
};

export default function TablePetsOwnersPage({
  selectedOwner,
  handleSelectPet,
  selectedPet,
}: Props) {
  const { pets } = usePetsByOwner(selectedOwner.id);

  const petsEmptyRows = 8 - pets.length;

  // Function for navigation in table with keyboard
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!pets.length) return;

    // Encuentra la fila actualmente seleccionada
    const currentIndex = pets.findIndex((o) => o.id === selectedPet?.id);

    // Arrow Down
    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, pets.length - 1); // nunca pasa del último
      if (nextIndex !== currentIndex) {
        handleSelectPet(pets[nextIndex]);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }

    // Arrow Up
    else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0); // nunca pasa del primero
      if (prevIndex !== currentIndex) {
        handleSelectPet(pets[prevIndex]);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Pets table */}
      <div
        className="w-[260px] h-[250px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0} // allow the div to receive focus
        onKeyDown={(e) => handleKeyNavigation(e)}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50 text-ellipsis">
          <thead>
            <tr>
              <th className="w-[10%] border border-gray-900 px-2 py-0.5"></th>
              <th className="w-[90%] border border-gray-900 px-2 py-0.5">
                Mascota
              </th>
            </tr>
          </thead>

          <tbody>
            {pets
              .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
              .map((pet: Pet, index) => {
                return (
                  <tr
                    key={pet.id}
                    ref={(el) => void (rowRefs.current[index] = el)}
                    onClick={() => handleSelectPet(pet)}
                    className={`cursor-pointer hover:bg-amber-200 ${
                      selectedPet?.id === pet.id ? "bg-amber-300" : ""
                    }`}
                  >
                    <td className="border border-gray-900 pl-1 py-0.5">
                      {selectedPet?.id === pet.id ? "➤" : ""}
                    </td>
                    <td className="border border-gray-900 px-2 py-0.5">
                      {pet.name}
                    </td>
                  </tr>
                );
              })}
            {Array.from({ length: petsEmptyRows > 0 ? petsEmptyRows : 0 }).map(
              (_, i) => (
                <tr key={`empty-${i}`}>
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
