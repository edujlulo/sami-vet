import LabelInputPets from "./LabelInputPets";
import TablePetsPetHistoryPage from "./TablePetsPetHistoryPage";
import type { Pet } from "../../../types/Pet";
import type { Owner } from "../../../types/Owner";
import LabelInputOwners from "../../owners/components/LabelInputOwners";
import { useEffect, useRef } from "react";
import { calculateAge } from "../../../helpers/ageCalculator";

interface FormPetsProps {
  selectedOwner: Owner;
  handleSelectPet: (pet: Pet) => void;
  selectedPet: Pet | null;
  setSelectedPet: React.Dispatch<React.SetStateAction<Pet | null>>;
  emptyPet: Pet;
  isEditing: boolean;
  isCreating: boolean;
  handleSave: () => void;
  pets: Pet[];
}

export default function FormPets({
  selectedOwner,
  handleSelectPet,
  selectedPet,
  setSelectedPet,
  emptyPet,
  isEditing,
  isCreating,
  handleSave,
  pets,
}: FormPetsProps) {
  const selectedOwnerSurnameAndName = `${selectedOwner.surname} ${selectedOwner.name}`;

  // initial focus on "Surname"
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((isEditing || isCreating) && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isEditing, isCreating]);

  // Form submit when pressing Enter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  // Age for selectedPet
  const age = selectedPet
    ? JSON.stringify(selectedPet) !== JSON.stringify(emptyPet)
      ? calculateAge(selectedPet.birthDate)
      : ""
    : "";

  // Assign registration date when is creating a new pet
  useEffect(() => {
    if (isCreating && selectedPet && !selectedPet.registrationDate) {
      const today = new Date().toISOString().split("T")[0];

      setSelectedPet({
        ...selectedPet,
        registrationDate: today,
      });
    }
  }, [isCreating]);

  return (
    <form onSubmit={handleSubmit} className="bg-amber-300 px-2 py-4">
      {/* --- Top box --- */}

      <div className="flex flex-row gap-2">
        <TablePetsPetHistoryPage
          selectedOwner={selectedOwner}
          handleSelectPet={handleSelectPet}
          pets={pets}
          selectedPet={selectedPet}
        />

        <div>
          {/* --- Owner row --- */}
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-blue-900 font-bold -mb-1 mt-1">
                Propietario
              </label>
              <input
                type="text"
                value={selectedOwnerSurnameAndName}
                disabled={true}
                readOnly={true}
                className="bg-amber-50 border border-gray-700 px-1 w-80"
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
          </div>

          {/* --- Pet row --- */}
          <div className="flex flex-row gap-2">
            <LabelInputPets
              label="Mascota"
              petKey="name"
              pet={selectedPet ?? emptyPet}
              setPet={setSelectedPet}
              isEditing={isEditing}
              isCreating={isCreating}
              className="w-30"
              inputRef={nameRef}
            />

            <LabelInputPets
              label="Fech Naci"
              petKey="birthDate"
              pet={selectedPet ?? emptyPet}
              setPet={setSelectedPet}
              isEditing={isEditing}
              isCreating={isCreating}
              type={
                JSON.stringify(selectedPet) === JSON.stringify(emptyPet)
                  ? "text"
                  : "date"
              }
              className="w-32"
            />

            {/* --- Actual age --- */}
            <div className="flex flex-col gap-1">
              <label className="text-blue-900 font-bold -mb-1 mt-1">Edad</label>
              <input
                type="text"
                value={age}
                disabled={true}
                className={`bg-amber-50 border border-gray-700 px-1 w-31`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom box --- */}

      <div>
        <div className="flex flex-row gap-2">
          <LabelInputPets
            label="Especie"
            petKey="species"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
          />

          <LabelInputPets
            label="Raza"
            petKey="breed"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
          />

          <LabelInputPets
            label="Sexo"
            petKey="sex"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />

          <LabelInputPets
            label="Pdg"
            petKey="pedigree"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-8"
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <LabelInputPets
            label="Color"
            petKey="color"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />

          <LabelInputPets
            label="Placa"
            petKey="licensePlate"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-20"
          />

          <LabelInputPets
            label="Chip"
            petKey="chip"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
          />

          <LabelInputPets
            label="Fech Regis"
            petKey="registrationDate"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            type={
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet)
                ? "text"
                : "date"
            }
            className="w-30"
          />

          <button
            type="submit"
            className="
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
            "
          >
            Asociar
          </button>
        </div>
      </div>
    </form>
  );
}
