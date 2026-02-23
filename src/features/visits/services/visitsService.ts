import { supabase } from "../../../supabaseClient";
import type { Visit } from "../../../types/Visit";

// Get all visits
export async function fetchVisitsService(): Promise<Visit[]> {
  const { data, error } = await supabase.from("visits").select("*");
  if (error) throw error;
  return data as Visit[];
}

export async function fetchVisitsByPet(petId: number): Promise<Visit[]> {
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("petId", petId);

  if (error) throw error;
  return data as Visit[];
}

// Insert a visit
export async function insertVisit(visit: Visit): Promise<Visit> {
  const visitToInsert = {
    ...visit,
    visitDate: visit.visitDate || null,
  };

  const { data, error } = await supabase
    .from("visits")
    .insert([visitToInsert])
    .select();

  if (error) throw error;
  if (!data || data.length === 0) throw new Error("No visit inserted");
  return data[0];
}

// Update a visit
export async function updateVisit(visit: Visit): Promise<Visit> {
  const { data, error } = await supabase
    .from("visits")
    .update(visit)
    .eq("id", visit.id)
    .select();

  if (error) throw error;
  if (!data || data.length === 0)
    throw new Error(`Visit with id ${visit.id} not found`);

  return data[0];
}

// Delete a visit
export async function deleteVisit(visitId: number): Promise<void> {
  const { error } = await supabase.from("visits").delete().eq("id", visitId);

  if (error) throw error;
}
