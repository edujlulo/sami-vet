import { useCallback, useEffect, useState } from "react";
import type { VisitEntity } from "../../../types/VisitEntity";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";
import { useVisitsContext } from "../context/VisitsContext";
import {
  deleteVisit,
  fetchVisitsService,
  insertVisit,
  updateVisit,
} from "../services/visitsService";
import { usePetsContext } from "../../pets/context/PetsContext";
import { usePetsByOwner } from "../../pets/hooks/usePetsByOwner";
import { useOwnersContext } from "../../owners/context/OwnersContext";

export function useVisits() {
  const { selectedVisit, setSelectedVisit, emptyVisit } = useVisitsContext();
  const { selectedPet, setSelectedPet, emptyPet } = usePetsContext();
  const { selectedOwner } = useOwnersContext();
  const [visits, setVisits] = useState<VisitWithRelations[]>([]);

  const { pets } = usePetsByOwner(selectedOwner.id);

  const [isEditing, setIsEditing] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [isOpenAddProcedureModal, setIsOpenAddProcedureModal] = useState(false);
  const [isOpenAssignVeterinarianModal, setIsOpenAssignVeterinarianModal] =
    useState(false);

  // ================= FETCH ALL VISITS =================

  const fetchVisits = useCallback(async () => {
    try {
      const data = await fetchVisitsService();
      setVisits(data);
      return data;
    } catch (error) {
      console.error("Error fetching visits:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  // =========== SELECT PET AFTER SELECTED VISIT ============
  useEffect(() => {
    if (!selectedVisit || pets.length === 0) return;

    const petFromVisit = pets.find((p) => p.id === selectedVisit.petId);
    if (petFromVisit) {
      setSelectedPet(petFromVisit);
    }
  }, [selectedVisit, pets]);

  // ================= NEW =================
  function handleNewVisit() {
    if (JSON.stringify(selectedPet) === JSON.stringify(emptyPet)) {
      window.alert("Debe tener una mascota seleccionada");
      return;
    }

    setSelectedVisit(emptyVisit);
    setIsOpenAddProcedureModal(true);
    setIsCreating(true);
    setIsEditing(false);
  }

  // ================= EDIT =================
  function handleEditVisit() {
    if (JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)) {
      window.alert("Debe tener una visita seleccionada");
      return;
    }

    setIsOpenAddProcedureModal(true);
    setIsCreating(false);
    setIsEditing(true);
  }

  // ================= CANCEL =================
  function handleCancelVisit() {
    setIsCreating(false);
    setIsEditing(true);
    setSelectedVisit(emptyVisit);
    setIsOpenAddProcedureModal(false);
    setIsOpenAssignVeterinarianModal(false);
  }

  // ================= SAVE =================
  async function handleSaveVisit() {
    if (!selectedVisit?.vet?.trim()) {
      window.alert("Debe ingresar un médico");
      return;
    }

    try {
      if (!selectedVisit) throw new Error("No visit selected");
      if (!selectedPet) throw new Error("No pet selected");

      const visitToSave: VisitEntity = {
        ...selectedVisit,
        petId: selectedPet.id!,
        visitDate:
          selectedVisit.visitDate || new Date().toISOString().split("T")[0],
      };

      let data: VisitEntity;

      if (isEditing) {
        console.log("Updating visit data...");
        if (!visitToSave.id || visitToSave.id === 0) {
          throw new Error("Cannot update visit without a valid ID");
        }
        data = await updateVisit(visitToSave);
        setIsOpenAssignVeterinarianModal(false);
      } else if (isCreating) {
        console.log("Saving new visit data...");
        data = await insertVisit(visitToSave);
        setIsCreating(false);
        setIsOpenAssignVeterinarianModal(false);
        setIsEditing(true);
      } else {
        return;
      }

      const updatedVisits = await fetchVisits();

      const updatedVisit = updatedVisits.find((v) => v.id === data.id);

      if (updatedVisit) {
        setSelectedVisit(updatedVisit);
      }
    } catch (error) {
      console.error("Error saving visit:", error);
    }
  }

  // ================= DELETE =================
  async function handleDeleteVisit() {
    if (!selectedVisit?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visit?",
    );
    if (!confirmDelete) return;

    try {
      await deleteVisit(selectedVisit.id);
      await fetchVisits();
      setSelectedVisit(emptyVisit);
      setIsCreating(false);
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  }

  // ================= SELECT =================
  function handleSelectVisit(visit: VisitWithRelations) {
    setSelectedVisit(visit);
    setIsEditing(true);
    setIsCreating(false);
  }

  // ============ ON CONTINUE ADD PROCEDURE MODAL ==============
  function onContinueAddProcedureModal() {
    if (!selectedVisit?.procedure?.trim()) {
      alert("Debe ingresar un procedimiento");
      return;
    }
    setIsOpenAssignVeterinarianModal(true);
    setIsOpenAddProcedureModal(false);
  }

  return {
    visits,
    handleSelectVisit,
    handleCancelVisit,
    handleSaveVisit,
    handleNewVisit,
    handleEditVisit,
    handleDeleteVisit,
    selectedVisit,
    setSelectedVisit,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
    emptyVisit,
    isOpenAddProcedureModal,
    onContinueAddProcedureModal,
    isOpenAssignVeterinarianModal,
  };
}
