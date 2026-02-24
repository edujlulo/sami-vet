import { normalizeStringsData } from "../../../helpers/normalizeStrings";
import { supabase } from "../../../supabaseClient";
import type { VisitEntity } from "../../../types/VisitEntity";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";

// Get all visits
export async function fetchVisitsService(): Promise<VisitWithRelations[]> {
  const { data, error } = await supabase.from("visits").select(`
      *,
      pet:petId (
        name,
        owner:ownerId (
          id,
          name,
          surname
        )
      )
    `);

  if (error) throw error;

  return data.map((v: any) => ({
    ...v,
    ownerId: v.pet?.owner?.id ?? "",
    petName: v.pet?.name ?? "",
    ownerSurname: v.pet?.owner?.surname ?? "",
    ownerName: v.pet?.owner?.name ?? "",
  }));
}

// Get visits by pet
export async function fetchVisitsByPet(petId: number): Promise<VisitEntity[]> {
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("petId", petId);

  if (error) throw error;
  return data as VisitEntity[];
}

// Insert a visit
export async function insertVisit(visit: VisitEntity): Promise<VisitEntity> {
  const normalizedVisit = normalizeStringsData(visit);

  const visitToInsert = {
    ...normalizedVisit,
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
export async function updateVisit(visit: VisitEntity): Promise<VisitEntity> {
  const normalizedVisit = normalizeStringsData(visit);

  const { data, error } = await supabase
    .from("visits")
    .update(normalizedVisit)
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
