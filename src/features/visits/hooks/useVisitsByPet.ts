import { useState, useEffect, useCallback } from "react";
import type { Visit } from "../../../types/Visit";
import { fetchVisitsByPet } from "../services/visitsService";

export function useVisitsByPet(petId: number | null) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVisits = useCallback(async () => {
    if (!petId) {
      setVisits([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchVisitsByPet(petId);
      setVisits(data);
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
    visits,
    loading,
    error,
    refetch: loadVisits,
  };
}
