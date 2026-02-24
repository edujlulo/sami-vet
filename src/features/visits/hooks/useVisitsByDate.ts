import { useState, useEffect, useCallback } from "react";
import { fetchVisitsByDate } from "../services/visitsService";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";

export function useVisitsByDate(date: string | null) {
  const [visitsByDate, setVisitsByDate] = useState<VisitWithRelations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVisits = useCallback(async () => {
    if (!date) {
      setVisitsByDate([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchVisitsByDate(date);
      setVisitsByDate(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch visits");
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  return {
    visitsByDate,
    loading,
    error,
    refetch: loadVisits,
  };
}
