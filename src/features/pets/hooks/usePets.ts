import { useState } from "react";
import type { Pet } from "../../../types/Pet";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);

  const emptyPet: Pet = {
    id: 0,
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

  const [selectedPet, setSelectedPet] = useState<Pet>(emptyPet);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // ================= CANCEL =================
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedPet(emptyPet);
  }

  // ================= SELECT =================
  function handleSelect(pet: Pet) {
    setSelectedPet(pet);
    setIsEditing(false);
    setIsCreating(false);
  }

  return {
    pets,
    setPets,
    handleSelect,
    handleCancel,
    selectedPet,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
  };
}
