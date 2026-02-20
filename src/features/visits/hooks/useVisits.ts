import { useState } from "react";
import type { Visit } from "../../../types/Visit";
import { useVisitsContext } from "../context/VisitsContext";
import {
  deleteVisit,
  insertVisit,
  updateVisit,
} from "../services/visitsService";
import { usePetsContext } from "../../pets/context/PetsContext";

interface UseVisitsProps {
  refetch: () => Promise<void>; // comes from useVisitsByPet
}

export function useVisits({ refetch }: UseVisitsProps) {
  const { selectedVisit, setSelectedVisit, emptyVisit } = useVisitsContext();
  const { selectedPet } = usePetsContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // ================= NEW =================
  function handleNew() {
    setSelectedVisit(emptyVisit);
    setIsCreating(true);
    setIsEditing(false);
  }

  // ================= CANCEL =================
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedVisit(emptyVisit);
  }

  // ================= SAVE =================
  async function handleSave() {
    try {
      if (!selectedVisit) throw new Error("No visit selected");
      if (!selectedPet) throw new Error("No pet selected");

      const visitToSave: Visit = {
        ...selectedVisit,
        petId: selectedPet.id!,
        visitDate: selectedVisit.visitDate || "",
      };

      let data: Visit;

      if (isEditing) {
        if (!visitToSave.id || visitToSave.id === 0) {
          throw new Error("Cannot update visit without a valid ID");
        }
        data = await updateVisit(visitToSave);
        setIsEditing(false);
      } else if (isCreating) {
        data = await insertVisit(visitToSave);
        setIsCreating(false);
      } else {
        return;
      }

      setSelectedVisit(data);

      // refresh table
      await refetch();
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
      setSelectedVisit(emptyVisit);
      setIsEditing(false);
      setIsCreating(false);

      // refresh list
      await refetch();
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  }

  // ================= SELECT =================
  function handleSelect(visit: Visit) {
    setSelectedVisit(visit);
    setIsEditing(false);
    setIsCreating(false);
  }

  return {
    handleSelect,
    handleCancel,
    handleSave,
    handleNew,
    handleDeleteVisit,
    selectedVisit,
    setSelectedVisit,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
    emptyVisit,
  };
}
