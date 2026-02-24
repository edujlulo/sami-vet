import { useState, useEffect, useCallback } from "react";
import { fetchVisitsByPet } from "../services/visitsService";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";

export function useVisitsByPet(petId: number | null) {
  const [visitsByPet, setVisitsByPets] = useState<VisitWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVisits = useCallback(async () => {
    if (!petId) {
      setVisitsByPets([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchVisitsByPet(petId);
      setVisitsByPets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch visits");
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  return {
    visitsByPet,
    loading,
    error,
    refetch: loadVisits,
  };
}
