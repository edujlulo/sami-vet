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

// Get visits by date
export async function fetchVisitsByDate(
  visitDate: string,
): Promise<VisitWithRelations[]> {
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("visitDate", visitDate);

  if (error) throw error;
  return data as VisitWithRelations[];
}

// Get visits by pet
export async function fetchVisitsByPet(
  petId: number,
): Promise<VisitWithRelations[]> {
  const { data, error } = await supabase
    .from("visits")
    .select(
      `
      *,
      pet:petId (
        name,
        owner:ownerId (
          id,
          name,
          surname
        )
      )
    `,
    )
    .eq("petId", petId);

  if (error) throw error;
  return data.map((v: any) => ({
    ...v,
    ownerId: v.pet?.owner?.id ?? "",
    petName: v.pet?.name ?? "",
    ownerSurname: v.pet?.owner?.surname ?? "",
    ownerName: v.pet?.owner?.name ?? "",
  }));
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

  // Solo campos de la tabla 'visits'
  const visitToUpdate: VisitEntity = {
    petId: normalizedVisit.petId,
    visitDate: normalizedVisit.visitDate || null,
    procedure: normalizedVisit.procedure || null,
    invoiceNumber: normalizedVisit.invoiceNumber || null,
    totalAmount: normalizedVisit.totalAmount || null,
    weightKg: normalizedVisit.weightKg || null,
    reasonForVisit: normalizedVisit.reasonForVisit || null,
    physicalExamination: normalizedVisit.physicalExamination || null,
    diagnosis: normalizedVisit.diagnosis || null,
    notes: normalizedVisit.notes || null,
    additionalTests: normalizedVisit.additionalTests || null,
    treatmentGiven: normalizedVisit.treatmentGiven || null,
    prescribedTreatment: normalizedVisit.prescribedTreatment || null,
    vet: normalizedVisit.vet || null,
    h: normalizedVisit.h || null,
    ex: normalizedVisit.ex || null,
    referredBy: normalizedVisit.referredBy || null,
  };

  const { data, error } = await supabase
    .from("visits")
    .update(visitToUpdate)
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
