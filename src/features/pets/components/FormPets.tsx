import LabelInputPets from "./LabelInputPets";
import TablePetsPetHistoryPage from "./TablePetsPetHistoryPage";
import type { Pet } from "../../../types/Pet";
import type { Owner } from "../../../types/Owner";
import LabelInputOwners from "../../owners/components/LabelInputOwners";
import { useEffect, useRef } from "react";
import { calculateAge } from "../../../helpers/ageCalculator";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("pets");
  const selectedOwnerSurnameAndName = `${selectedOwner.surname} ${selectedOwner.name}`;

  // initial focus on "Pet Name"
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if ((isEditing || isCreating) && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isEditing, isCreating]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const age = selectedPet
    ? JSON.stringify(selectedPet) !== JSON.stringify(emptyPet)
      ? calculateAge(selectedPet.birthDate)
      : ""
    : "";

  useEffect(() => {
    if (isCreating && selectedPet && !selectedPet.registrationDate) {
      const today = new Date().toISOString().split("T")[0];
      setSelectedPet({ ...selectedPet, registrationDate: today });
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
                {t("owner")}
              </label>
              <input
                type="text"
                value={selectedOwnerSurnameAndName}
                disabled
                readOnly
                className="bg-amber-50 border border-gray-700 px-1 w-80"
              />
            </div>

            <LabelInputOwners
              label={t("customerNumber")}
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
              label={t("petName")}
              petKey="name"
              pet={selectedPet ?? emptyPet}
              setPet={setSelectedPet}
              isEditing={isEditing}
              isCreating={isCreating}
              className="w-30"
              inputRef={nameRef}
            />

            <LabelInputPets
              label={t("birthDate")}
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

            <div className="flex flex-col gap-1">
              <label className="text-blue-900 font-bold -mb-1 mt-1">
                {t("age")}
              </label>
              <input
                type="text"
                value={age}
                disabled
                className="bg-amber-50 border border-gray-700 px-1 w-31"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom box --- */}
      <div>
        <div className="flex flex-row gap-2">
          <LabelInputPets
            label={t("species")}
            petKey="species"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
          />
          <LabelInputPets
            label={t("breed")}
            petKey="breed"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
          />
          <LabelInputPets
            label={t("sex")}
            petKey="sex"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
          <LabelInputPets
            label={t("pedigree")}
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
            label={t("color")}
            petKey="color"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
          <LabelInputPets
            label={t("chip")}
            petKey="microchip"
            pet={selectedPet ?? emptyPet}
            setPet={setSelectedPet}
            isEditing={isEditing}
            isCreating={isCreating}
          />
          <LabelInputPets
            label={t("registrationDate")}
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
              w-23
              text-blue-900
              font-bold
              disabled:text-gray-400
              disabled:cursor-not-allowed
              disabled:hover:bg-gray-200
              ml-2
              self-end
            "
          >
            {t("associate")}
          </button>
        </div>
      </div>
    </form>
  );
}
