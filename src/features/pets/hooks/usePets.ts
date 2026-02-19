import { useState } from "react";
import type { Pet } from "../../../types/Pet";
import { usePetsContext } from "../context/PetsContext";
import { deletePet, insertPet, updatePet } from "../services/petsService";
import { useOwnersContext } from "../../owners/context/OwnersContext";

interface UsePetsProps {
  refetch: () => Promise<void>; // viene de usePetsByOwner
}

export function usePets({ refetch }: UsePetsProps) {
  const { selectedPet, setSelectedPet } = usePetsContext();
  const { selectedOwner } = useOwnersContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const emptyPet: Omit<Pet, "id"> = {
    ownerId: 0,
    name: "",
    birthDate: "",
    species: "",
    breed: "",
    sex: "",
    pedigree: "",
    color: "",
    licensePlate: "",
    chip: "",
    registrationDate: "",
  };

  // ================= NEW =================
  function handleNew() {
    setSelectedPet(emptyPet);
    setIsCreating(true);
    setIsEditing(false);
  }

  // ================= CANCEL =================
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedPet(emptyPet);
  }

  // ================= SAVE =================
  async function handleSave() {
    try {
      if (!selectedPet) throw new Error("No pet selected");
      if (!selectedOwner) throw new Error("No owner selected");

      const petToSave: Pet = {
        ...selectedPet,
        ownerId: selectedOwner.id,
        birthDate: selectedPet.birthDate || null,
        registrationDate: selectedPet.registrationDate || null,
      };

      let data: Pet;

      if (isEditing) {
        if (!petToSave.id || petToSave.id === 0) {
          throw new Error("Cannot update pet without a valid ID");
        }
        data = await updatePet(petToSave);
        setIsEditing(false);
      } else if (isCreating) {
        data = await insertPet(petToSave);
        setIsCreating(false);
      } else {
        return;
      }

      setSelectedPet(data);

      // 🔥 actualizamos la tabla llamando a refetch
      await refetch();
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  }

  // ================= DELETE =================
  async function handleDeletePet() {
    if (!selectedPet?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?",
    );
    if (!confirmDelete) return;

    try {
      await deletePet(selectedPet.id);
      setSelectedPet(emptyPet);
      setIsEditing(false);
      setIsCreating(false);

      // 🔥 refrescar lista
      await refetch();
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  }

  // ================= SELECT =================
  function handleSelect(pet: Pet) {
    setSelectedPet(pet);
    setIsEditing(false);
    setIsCreating(false);
  }

  return {
    handleSelect,
    handleCancel,
    handleSave,
    handleNew,
    handleDeletePet,
    selectedPet,
    setSelectedPet,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
    emptyPet,
  };
}
