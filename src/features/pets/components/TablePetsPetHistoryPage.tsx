import { useRef, useState, useMemo } from "react";
import type { Owner } from "../../../types/Owner";
import type { Pet } from "../../../types/Pet";

interface TablePetsPetHistoryPageProps {
  selectedOwner: Owner;
  handleSelectPet: (pet: Pet) => void;
  pets: Pet[];
  selectedPet: Pet | null;
}

export default function TablePetsPetHistoryPage({
  handleSelectPet,
  pets,
  selectedPet,
}: TablePetsPetHistoryPageProps) {
  const petsEmptyRows = 4 - pets.length;

  // Refs para scroll
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  // Estado de ordenamiento
  const [sortConfig, setSortConfig] = useState<{
    key: "id" | "name";
    direction: "asc" | "desc";
  }>({ key: "id", direction: "asc" });

  // Función para cambiar la columna y la dirección de orden
  const handleSort = (key: "id" | "name") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Lista ordenada memorizada
  const sortedPets = useMemo(() => {
    const sorted = [...pets];
    if (sortConfig.key === "id") {
      sorted.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    } else if (sortConfig.key === "name") {
      sorted.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      );
    }
    if (sortConfig.direction === "desc") sorted.reverse();
    return sorted;
  }, [pets, sortConfig]);

  // Navegación con teclado
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!sortedPets.length) return;

    const currentIndex = sortedPets.findIndex((o) => o.id === selectedPet?.id);

    if (e.key === "ArrowDown") {
      const nextIndex = Math.min(currentIndex + 1, sortedPets.length - 1);
      if (nextIndex !== currentIndex) {
        handleSelectPet(sortedPets[nextIndex]);
        rowRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIndex = Math.max(currentIndex - 1, 0);
      if (prevIndex !== currentIndex) {
        handleSelectPet(sortedPets[prevIndex]);
        rowRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" });
      }
      e.preventDefault();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="w-[260px] h-[120px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed text-ellipsis">
          <colgroup>
            <col className="w-[10%]" />
            <col className="w-[30%]" />
            <col className="w-[50%]" />
          </colgroup>

          <thead>
            <tr>
              <th className="border border-gray-900 px-2 py-0.5"></th>

              <th
                onClick={() => handleSort("id")}
                className="border border-gray-900  py-0.5 cursor-pointer select-none hover:bg-amber-200"
              >
                Historia{" "}
                {sortConfig.key === "id"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() => handleSort("name")}
                className="border border-gray-900 px-2 py-0.5 cursor-pointer select-none hover:bg-amber-200"
              >
                Mascota{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedPets.map((pet, index) => (
              <tr
                key={pet.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                onClick={() => handleSelectPet(pet)}
                className={`cursor-pointer hover:bg-amber-200 ${
                  selectedPet?.id === pet.id ? "bg-amber-300" : ""
                }`}
              >
                <td className="border border-gray-900 pl-1 py-0.5">
                  {selectedPet?.id === pet.id ? "➤" : ""}
                </td>
                <td className="border border-gray-900 px-2 py-0.5">{pet.id}</td>
                <td className="border border-gray-900 px-2 py-0.5">
                  {pet.name}
                </td>
              </tr>
            ))}

            {Array.from({ length: petsEmptyRows > 0 ? petsEmptyRows : 0 }).map(
              (_, i) => (
                <tr key={`empty-${i}`}>
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
