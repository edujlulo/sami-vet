import ButtonsPetHistory from "../../features/pets/components/ButtonsPetHistory";
import FormPets from "../../features/pets/components/FormPets";

export default function PetHistoryPage() {
  return (
    <div>
      <div className="bg-amber-200 px-3 py-6 pb-10 w-[1122px] h-[1000px] flex justify-center items-center rounded-b-lg border border-t-0 border-gray-300">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* --- Pets form --- */}
          <FormPets />

          {/* --- Buttons Pets --- */}
          <ButtonsPetHistory />
        </div>
      </div>
    </div>
  );
}
