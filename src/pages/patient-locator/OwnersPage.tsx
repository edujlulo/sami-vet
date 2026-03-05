import FormOwners from "../../features/owners/components/FormOwners";
import TableOwners from "../../features/owners/components/TableOwners";
import ButtonsOwners from "../../features/owners/components/ButtonsOwners";
import TablePetsOwnersPage from "../../features/pets/components/TablePetsOwnersPage";
import TableVisitsOwnersPage from "../../features/visits/components/TableVisitsOwnersPage";
import ButtonsVisits from "../../features/visits/components/ButtonsVisits";
import { useOwners } from "../../features/owners/hooks/useOwners";
import { useOwnersContext } from "../../features/owners/context/OwnersContext";
import type { Pet } from "../../types/Pet";
import { usePetsContext } from "../../features/pets/context/PetsContext";
import AddProcedureModal from "../../features/visits/components/modals/AddProcedureModal";
import { useVisits } from "../../features/visits/hooks/useVisits";
import AssignVeterinarianModal from "../../features/visits/components/modals/AssignVeterinarianModal";
import { useVisitsContext } from "../../features/visits/context/VisitsContext";
import type { VisitWithRelations } from "../../types/VisitWithRelations";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import TableOutstandingPaymentsOwnersPage from "../../features/invoices/components/TableOutstandingPaymentsOwnersPage";
import InvoicesPage from "../../features/invoices/components/InvoicesPage";

interface Props {
  handleSelectPet: (pet: Pet) => void;
  handleSelectVisit: (visit: VisitWithRelations) => void;
  showInvoicesPage: boolean;
  setShowInvoicesPage: boolean;
}

export default function OwnersPage({
  handleSelectPet,
  handleSelectVisit,
  showInvoicesPage,
  setShowInvoicesPage,
}: Props) {
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

  const visits = useVisits();

  const { selectedOwner, setSelectedOwner } = useOwnersContext();
  const { selectedPet } = usePetsContext();
  const { selectedVisit, setSelectedVisit, emptyVisit } = useVisitsContext();

  // =================== Invoice Page UI ====================
  if (showInvoicesPage) {
    return (
      <>
        <InvoicesPage setShowInvoicesPage={setShowInvoicesPage} />
      </>
    );
  }

  // =================== Owners Page UI ====================
  return (
    <>
      {/* Language buttons top-right */}
      <LanguageSwitcher />

      <div className="bg-amber-200 pb-4 rounded-b-lg border border-t-0 border-gray-300 ">
        {/* Top box */}
        <div className="flex flex-row items-center justify-center gap-15">
          <div className="flex flex-col gap-1 items-center">
            <FormOwners
              selectedOwner={selectedOwner}
              setSelectedOwner={setSelectedOwner}
              isEditing={isEditing}
              isCreating={isCreating}
              handleSave={handleSave}
            />
            <TableOwners
              owners={owners}
              handleSelect={handleSelect}
              selectedOwner={selectedOwner}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
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
            <TablePetsOwnersPage
              selectedOwner={selectedOwner}
              handleSelectPet={handleSelectPet}
              selectedPet={selectedPet}
            />
            <TableOutstandingPaymentsOwnersPage />
          </div>
        </div>

        {/* Bottom box */}
        <div className="flex flex-row gap-2 justify-center items-center mx-10">
          <TableVisitsOwnersPage
            handleSelectVisit={handleSelectVisit}
            selectedVisit={selectedVisit}
            visits={visits.visits}
            loading={visits.loading}
            handleFilterChange={visits.handleFilterChange}
          />
          <ButtonsVisits
            handleNewVisit={visits.handleNewVisit}
            handleEditVisit={visits.handleEditVisit}
            setShowInvoicesPage={setShowInvoicesPage}
          />
        </div>
      </div>
      {visits.isOpenAddProcedureModal && (
        <AddProcedureModal
          isOpenAddProcedureModal={visits.isOpenAddProcedureModal}
          selectedVisit={selectedVisit}
          setSelectedVisit={setSelectedVisit}
          emptyVisit={emptyVisit}
          handleCancelVisit={visits.handleCancelVisit}
          onContinueAddProcedureModal={visits.onContinueAddProcedureModal}
        />
      )}

      {visits.isOpenAssignVeterinarianModal && (
        <AssignVeterinarianModal
          isOpenAssignVeterinarianModal={visits.isOpenAssignVeterinarianModal}
          selectedVisit={selectedVisit}
          setSelectedVisit={setSelectedVisit}
          emptyVisit={emptyVisit}
          handleCancelVisit={visits.handleCancelVisit}
          handleSaveVisit={visits.handleSaveVisit}
        />
      )}
    </>
  );
}
