import FormOwners from "../../features/owners/components/FormOwners";
import TableOwners from "../../features/owners/components/TableOwners";
import ButtonsOwners from "../../features/owners/components/ButtonsOwners";
import TablePetsOwnersPage from "../../features/pets/components/TablePetsOwnersPage";
import TableVisitsOwnersPage from "../../features/visits/components/TableVisitsOwnersPage";
import ButtonsVisits from "../../features/visits/components/ButtonsVisits";
import type { OwnersPageProps } from "../../types/OwnersPageProps";

export default function OwnersPage({
  owners,
  selectedOwner,
  isEditing,
  isCreating,
  setSelectedOwner,
  setIsEditing,
  handleNew,
  handleCancel,
  handleSave,
  handleDeleteOwner,
  handleSelect,
  emptyOwner,
}: OwnersPageProps) {
  return (
    <div className="bg-amber-200 px-3 py-6 pb-10 rounded-b-lg border border-t-0 border-gray-300">
      {/* Top box */}
      <div className="flex flex-row items-center justify-center gap-6">
        <div className="flex flex-col gap-2 items-center">
          <FormOwners
            selectedOwner={selectedOwner}
            setSelectedOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
          />
          <TableOwners owners={owners} handleSelect={handleSelect} />
        </div>
        <div className="flex flex-col items-center gap-6">
          <ButtonsOwners
            setIsEditing={setIsEditing}
            selectedOwner={selectedOwner}
            isCreating={isCreating}
            isEditing={isEditing}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleNew={handleNew}
            handleDeleteOwner={handleDeleteOwner}
            emptyOwner={emptyOwner}
          />
          <TablePetsOwnersPage />
        </div>
      </div>

      {/* Bottom box */}
      <div className="flex flex-row gap-2 justify-center items-center mx-10">
        <TableVisitsOwnersPage />
        <ButtonsVisits />
      </div>
    </div>
  );
}
