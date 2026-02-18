import ButtonsPetHistory from "../../features/pets/components/ButtonsPetHistory";
import FormPets from "../../features/pets/components/FormPets";
import { usePets } from "../../features/pets/hooks/usePets";
import FormVisits from "../../features/visits/components/FormVisits";
import TableVisitsPetHistoryPage from "../../features/visits/components/TableVisitsPetHistoryPage";
import TablePetVaccines from "../../features/pets/components/TablePetVaccines";
import TableUpcomingVisits from "../../features/visits/components/TableUpcomingVisits";
import { usePetsByOwner } from "../../features/pets/hooks/usePetsByOwner";
import { useOwnersContext } from "../../features/owners/context/OwnersContext";

export default function PetHistoryPage({}) {
  const { handleCancel, setIsEditing, handleSelect, selectedPet, emptyPet } =
    usePets();

  const { selectedOwner } = useOwnersContext();

  const { pets } = usePetsByOwner(selectedOwner.id ?? null);

  return (
    <div>
      <div className="bg-amber-200 px-3 py-6 pb-10 w-[1293px] h-[1000px] flex justify-center items-center rounded-b-lg border border-t-0 border-gray-300">
        <div className="flex flex-col justify-center items-center gap-1">
          {/* --- Main top box --- */}
          <div className="flex flex-row gap-2">
            {/* --- Left box --- */}
            <div className="flex flex-col gap-4">
              {/* --- Pets form --- */}
              <FormPets
                selectedPet={selectedPet}
                pets={pets}
                selectedOwner={selectedOwner}
                handleSelect={handleSelect}
                emptyPet={emptyPet}
              />

              {/* --- Visits form --- */}
              <TableVisitsPetHistoryPage />
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
          />
        </div>
      </div>
    </div>
  );
}
