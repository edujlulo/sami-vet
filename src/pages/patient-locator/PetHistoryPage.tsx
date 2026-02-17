import ButtonsPetHistory from "../../features/pets/components/ButtonsPetHistory";
import FormPets from "../../features/pets/components/FormPets";
import { usePets } from "../../features/pets/hooks/usePets";
import FormVisits from "../../features/visits/components/FormVisits";

export default function PetHistoryPage() {
  const { pets, handleSelect, selectedPet } = usePets();

  return (
    <div>
      <div className="bg-amber-200 px-3 py-6 pb-10 w-[1293px] h-[1000px] flex justify-center items-center rounded-b-lg border border-t-0 border-gray-300">
        <div className="flex flex-col justify-center items-center gap-1">
          {/* --- Main top box --- */}
          <div className="flex flex-row gap-2">
            {/* --- Left box --- */}
            <div>
              {/* --- Pets form --- */}
              <FormPets
                selectedPet={selectedPet}
                pets={pets}
                handleSelect={handleSelect}
              />
            </div>

            {/* --- Right box --- */}
            <div>
              {/* --- Form visits --- */}
              <FormVisits />
            </div>
          </div>

          {/* --- Buttons Pets --- */}
          <ButtonsPetHistory />
        </div>
      </div>
    </div>
  );
}
