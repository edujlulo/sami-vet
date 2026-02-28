import ButtonsPetHistory from "../../features/pets/components/ButtonsPetHistory";
import FormPets from "../../features/pets/components/FormPets";
import { usePets } from "../../features/pets/hooks/usePets";
import FormVisits from "../../features/visits/components/FormVisits";
import TableVisitsPetHistoryPage from "../../features/visits/components/TableVisitsPetHistoryPage";
import TablePetVaccines from "../../features/pets/components/TablePetVaccines";
import TableUpcomingVisits from "../../features/visits/components/TableUpcomingVisits";
import { usePetsByOwner } from "../../features/pets/hooks/usePetsByOwner";
import { useOwnersContext } from "../../features/owners/context/OwnersContext";
import type { Pet } from "../../types/Pet";
import type { VisitWithRelations } from "../../types/VisitWithRelations";
import LanguageSwitcher from "../../components/LanguageSwitcher";

interface Props {
  handleSelectPet: (pet: Pet) => void;
  handleSelectVisit: (visit: VisitWithRelations) => void;
}

export default function PetHistoryPage({
  handleSelectPet,
  handleSelectVisit,
}: Props) {
  const { selectedOwner } = useOwnersContext();

  const { pets, refetch } = usePetsByOwner(selectedOwner.id);

  const {
    handleCancel,
    setIsEditing,
    handleSave,
    handleNew,
    handleDeletePet,
    selectedPet,
    setSelectedPet,
    emptyPet,
    isEditing,
    isCreating,
  } = usePets({ refetch });

  async function handleSaveWithRefetch() {
    await handleSave();
    await refetch();
  }

  async function handleDeleteWithRefetch() {
    await handleDeletePet();
    await refetch();
  }

  return (
    <div>
      {/* Language buttons top-right */}
      <LanguageSwitcher />

      <div className="bg-amber-200 px-8 py-3 flex justify-center items-center rounded-b-lg border border-t-0 border-gray-300">
        <div className="flex flex-col justify-center items-center gap-1">
          {/* --- Main top box --- */}
          <div className="flex flex-row gap-2">
            {/* --- Left box --- */}
            <div className="flex flex-col gap-4">
              {/* --- Pets form --- */}
              <FormPets
                selectedPet={selectedPet}
                setSelectedPet={setSelectedPet}
                selectedOwner={selectedOwner}
                handleSelectPet={handleSelectPet}
                emptyPet={emptyPet}
                isEditing={isEditing}
                isCreating={isCreating}
                handleSave={handleSaveWithRefetch}
                pets={pets}
              />

              {/* --- Visits form --- */}
              <TableVisitsPetHistoryPage
                handleSelectVisit={handleSelectVisit}
              />
              <div className="flex flex-row gap-6 ml-3">
                {/* --- Vaccines history --- */}
                <TablePetVaccines />

                {/* --- Upcoming visits --- */}
                <TableUpcomingVisits />
              </div>
            </div>

            {/* --- Right box --- */}
            <div>
              {/* --- Form visits --- */}
              <FormVisits />
            </div>
          </div>

          {/* --- Buttons Pets --- */}
          <ButtonsPetHistory
            setIsEditing={setIsEditing}
            handleCancel={handleCancel}
            handleSave={handleSaveWithRefetch}
            handleNew={handleNew}
            handleDeletePet={handleDeleteWithRefetch}
            isEditing={isEditing}
            isCreating={isCreating}
            selectedPet={selectedPet}
            emptyPet={emptyPet}
          />
        </div>
      </div>
    </div>
  );
}
