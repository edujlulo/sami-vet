import { useState, useEffect, useCallback } from "react";
import type { Pet } from "../../../types/Pet";
import { fetchPetsByOwner } from "../services/petsService";

export function usePetsByOwner(ownerId: number | null) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPets = useCallback(async () => {
    if (!ownerId) {
      setPets([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchPetsByOwner(ownerId);
      setPets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  }, [ownerId]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  return {
    pets,
    loading,
    error,
    refetch: loadPets,
  };
}
