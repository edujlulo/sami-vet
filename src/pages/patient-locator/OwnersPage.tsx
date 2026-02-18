import FormOwners from "../../features/owners/components/FormOwners";
import TableOwners from "../../features/owners/components/TableOwners";
import ButtonsOwners from "../../features/owners/components/ButtonsOwners";
import TablePetsOwnersPage from "../../features/pets/components/TablePetsOwnersPage";
import TableVisitsOwnersPage from "../../features/visits/components/TableVisitsOwnersPage";
import TableOutstandingPayments from "../../features/billing/components/TableOutstandingPayments";
import ButtonsVisits from "../../features/visits/components/ButtonsVisits";
import { useOwners } from "../../features/owners/hooks/useOwners";
import { useOwnersContext } from "../../features/owners/context/OwnersContext";

export default function OwnersPage() {
  const {
    owners,
    isEditing,
    isCreating,
    setIsEditing,
    handleNew,
    handleCancel,
    handleSave,
    handleDeleteOwner,
    handleSelect,
    emptyOwner,
  } = useOwners();

  const { selectedOwner, setSelectedOwner } = useOwnersContext();

  return (
    <div className="bg-amber-200 px-25 py-6 pb-10 rounded-b-lg border border-t-0 border-gray-300">
      {/* Top box */}
      <div className="flex flex-row items-center justify-center gap-6">
        <div className="flex flex-col gap-2 items-center">
          <FormOwners
            selectedOwner={selectedOwner}
            setSelectedOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            handleSave={handleSave}
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
          <TablePetsOwnersPage selectedOwner={selectedOwner} />
          <TableOutstandingPayments />
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
