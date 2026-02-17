import { useState, useEffect } from "react";
import type { Pet } from "../../../types/Pet";
import { fetchPets } from "../services/petsService";

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

  // ================= FETCH =================
  useEffect(() => {
    fetchPets().then(setPets).catch(console.error);
  }, []);

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
    selectedPet,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
  };
}
