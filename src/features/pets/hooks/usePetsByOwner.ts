import { useState, useEffect } from "react";
import type { Pet } from "../../../types/Pet";
import { fetchPetsByOwner } from "../services/petsService";

export function usePetsByOwner(ownerId: number | null) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) {
      setPets([]);
      return;
    }

    async function loadPets() {
      try {
        setLoading(true);
        setError(null);

        if (ownerId !== null) {
          const data = await fetchPetsByOwner(ownerId);
          setPets(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pets");
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, [ownerId]);

  return {
    pets,
    loading,
    error,
    setPets, // useful after creating/deleting pets
  };
}
