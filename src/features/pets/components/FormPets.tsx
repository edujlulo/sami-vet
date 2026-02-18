import LabelInputPets from "./LabelInputPets";
import TablePetsPetHistoryPage from "./TablePetsPetHistoryPage";
import type { Pet } from "../../../types/Pet";
import type { Owner } from "../../../types/Owner";
import LabelInputOwners from "../../owners/components/LabelInputOwners";

interface FormPetsProps {
  pets: Pet[];
  selectedOwner: Owner;
  handleSelect: (pet: Pet) => void;
  selectedPet: Pet | null;
  emptyPet: Pet;
}

export default function FormPets({
  pets,
  selectedOwner,
  handleSelect,
  selectedPet,
  emptyPet,
}: FormPetsProps) {
  const selectedOwnerSurnameAndName = `${selectedOwner.surname} ${selectedOwner.name}`;

  return (
    <div className="bg-amber-300 px-2 py-4">
      {/* --- Top box --- */}

      <div className="flex flex-row gap-2">
        <TablePetsPetHistoryPage pets={pets} handleSelect={handleSelect} />
        <div>
          <form className="flex flex-row gap-2">
            {/* --- Owner input (Only read) --- */}
            <div className="flex flex-col gap-1">
              <label className="text-blue-900 font-bold -mb-1 mt-1">
                Propietario
              </label>
              <input
                type="text"
                value={selectedOwnerSurnameAndName}
                disabled={true}
                readOnly={true}
                className={`bg-amber-50 border border-gray-700 px-1 w-80`}
              />
            </div>
            <LabelInputOwners
              label="N. Cliente"
              ownerKey="id"
              owner={selectedOwner}
              isEditing={false}
              isCreating={false}
              className="w-20"
            />
          </form>
          <form className="flex flex-row gap-2">
            <LabelInputPets
              label="Mascota"
              petKey="name"
              pet={selectedPet ?? emptyPet}
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
            pet={selectedPet ?? emptyPet}
            isEditing={true}
            isCreating={true}
          />
          <LabelInputPets
            label="Raza"
            petKey="breed"
            pet={selectedPet ?? emptyPet}
            isEditing={true}
            isCreating={true}
          />
          <LabelInputPets
            label="Sexo"
            petKey="sex"
            pet={selectedPet ?? emptyPet}
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <LabelInputPets
            label="Pdg"
            petKey="pedigree"
            pet={selectedPet ?? emptyPet}
            isEditing={true}
            isCreating={true}
            className="w-8"
          />
        </form>
        <form className="flex flex-row gap-2 items-center">
          <LabelInputPets
            label="Color"
            petKey="color"
            pet={selectedPet ?? emptyPet}
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <LabelInputPets
            label="Placa"
            petKey="licensePlate"
            pet={selectedPet ?? emptyPet}
            isEditing={true}
            isCreating={true}
            className="w-20"
          />
          <LabelInputPets
            label="Chip"
            petKey="chip"
            pet={selectedPet ?? emptyPet}
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
