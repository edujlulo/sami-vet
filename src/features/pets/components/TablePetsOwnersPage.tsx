import { useRef, useState, useMemo } from "react";
import type { Owner } from "../../../types/Owner";
import type { Pet } from "../../../types/Pet";
import { usePetsByOwner } from "../hooks/usePetsByOwner";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("pets");

  const { pets } = usePetsByOwner(selectedOwner.id);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const petsEmptyRows = 11 - pets.length;

  // Toggle sorting direction
  function handleSort() {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  // Sorted pets (memoized)
  const sortedPets = useMemo(() => {
    const sorted = [...pets].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );

    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [pets, sortDirection]);

  // Keyboard navigation
  function handleKeyNavigation(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!sortedPets.length) return;

    const currentIndex = sortedPets.findIndex((p) => p.id === selectedPet?.id);

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
        className="w-[260px] h-[210px] overflow-y-auto border border-gray-900 focus-within:ring-3 focus-within:ring-blue-300 rounded-md"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed text-ellipsis">
          <thead>
            <tr>
              <th className="w-[10%] border border-gray-900 px-2 py-0.5"></th>

              <th
                onClick={handleSort}
                className="w-[90%] border border-gray-900 px-2 py-0.5 cursor-pointer select-none hover:bg-amber-200"
              >
                {t("pets")} {sortDirection === "asc" ? "▲" : "▼"}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedPets.map((pet: Pet, index) => (
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

                <td className="border border-gray-900 px-2 py-0.5 truncate">
                  {pet.name}
                </td>
              </tr>
            ))}

            {Array.from({
              length: petsEmptyRows > 0 ? petsEmptyRows : 0,
            }).map((_, i) => (
              <tr key={`empty-${i}`}>
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
