import { useState } from "react";
import type { Pet } from "../../../types/Pet";
import { usePetsContext } from "../context/PetsContext";

export function usePets() {
  const { selectedPet, setSelectedPet } = usePetsContext();
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
    emptyPet,
  };
}
