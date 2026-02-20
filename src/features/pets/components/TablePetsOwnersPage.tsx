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
  const petsEmptyRows = 8;

  const { pets } = usePetsByOwner(selectedOwner.id);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Pets table */}
      <div className="w-[260px] h-[250px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50">
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
              .map((pet: Pet) => {
                return (
                  <tr
                    key={pet.id}
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
