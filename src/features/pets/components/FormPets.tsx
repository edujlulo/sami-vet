import LabelInputPets from "./LabelInputPets";
import TablePetsPetHistoryPage from "./TablePetsPetHistoryPage";
import type { Pet } from "../../../types/Pet";

interface FormPetsProps {
  pets: Pet[];
  // handleSelect: (pet: Pet) => void;
  // selectedPet: Pet;
}

export default function FormPets({
  pets,
  // handleSelect,
  // selectedPet,
}: FormPetsProps) {
  return (
    <div className="bg-amber-300 px-2 py-4">
      {/* --- Top box --- */}

      <div className="flex flex-row gap-2">
        <TablePetsPetHistoryPage pets={pets} />
        <div>
          <form className="flex flex-row gap-2">
            <LabelInputPets
              label="Propietario"
              isEditing={true}
              isCreating={true}
              className="w-80"
            />
            <LabelInputPets
              label="N. Cliente"
              isEditing={true}
              isCreating={true}
              className="w-20"
            />
          </form>
          <form className="flex flex-row gap-2">
            <LabelInputPets
              label="Mascota"
              petKey="name"
              // pet={selectedPet}
              isEditing={true}
              isCreating={true}
              className="w-30"
            />
            <LabelInputPets
              label="Fech Naci"
              isEditing={true}
              isCreating={true}
              className="w-30"
            />
            <LabelInputPets
              label="Edad"
              isEditing={true}
              isCreating={true}
              className="w-30"
            />
          </form>
        </div>
      </div>

      {/* --- Bottom box --- */}

      <div>
        <form className="flex flex-row gap-2">
          <LabelInputPets
            label="Especie"
            petKey="species"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
          />
          <LabelInputPets
            label="Raza"
            petKey="breed"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
          />
          <LabelInputPets
            label="Sexo"
            petKey="sex"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <LabelInputPets
            label="Pdg"
            petKey="pedigree"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
            className="w-8"
          />
        </form>
        <form className="flex flex-row gap-2 items-center">
          <LabelInputPets
            label="Color"
            petKey="color"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <LabelInputPets
            label="Placa"
            petKey="licensePlate"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
            className="w-20"
          />
          <LabelInputPets
            label="Chip"
            petKey="chip"
            // pet={selectedPet}
            isEditing={true}
            isCreating={true}
          />
          <LabelInputPets
            label="Fech Regis"
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <button
            className={`
        bg-amber-50
        border border-gray-300
        rounded-md
        py-1
        px-2
        cursor-pointer
        shadow-sm
        hover:bg-green-50
        hover:border-green-300
        hover:shadow-md
        transform
        hover:-translate-y-px
        active:translate-y-0
        transition-all duration-150
        w-20
       text-blue-900
       font-bold
        disabled:text-gray-400
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-200
        ml-2
        self-end
      `}
          >
            Asociar
          </button>
        </form>
      </div>
    </div>
  );
}
