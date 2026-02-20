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
  const petsEmptyRows = 3;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Pets table */}
      <div className="w-[260px] h-[120px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed">
          <colgroup>
            <col className="w-[10%]" />
            <col className="w-[30%]" />
            <col className="w-[60%]" />
          </colgroup>

          <thead>
            <tr>
              <th className="border border-gray-900 px-2 py-0.5"></th>
              <th className="border border-gray-900  py-0.5">Historia</th>
              <th className="border border-gray-900 px-2 py-0.5">Mascota</th>
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
                      {pet.id}
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
