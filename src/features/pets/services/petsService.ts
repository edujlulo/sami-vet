import { normalizeStringsData } from "../../../helpers/normalizeStrings";
import { supabase } from "../../../supabaseClient";
import type { Pet } from "../../../types/Pet";

// Get all pets
export async function fetchPets(): Promise<Pet[]> {
  const { data, error } = await supabase.from("pets").select("*");
  if (error) throw error;
  return data as Pet[];
}

// Get pets by owner
export async function fetchPetsByOwner(ownerId: number): Promise<Pet[]> {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("ownerId", ownerId);
  if (error) throw error;
  return data as Pet[];
}

// Insert a pet
export async function insertPet(pet: Pet): Promise<Pet> {
  const normalizedPet = normalizeStringsData(pet);

  const petToInsert = {
    ...normalizedPet,
    birthDate: pet.birthDate || null,
    registrationDate: pet.registrationDate || null,
  };

  const { data, error } = await supabase
    .from("pets")
    .insert([petToInsert])
    .select();

  if (error) throw error;
  if (!data || data.length === 0) throw new Error("No pet inserted");
  return data[0];
}

// Update a pet
export async function updatePet(pet: Pet): Promise<Pet> {
  const normalizedPet = normalizeStringsData(pet);

  const { data, error } = await supabase
    .from("pets")
    .update(normalizedPet)
    .eq("id", pet.id)
    .select();

  if (error) throw error;
  if (!data || data.length === 0)
    throw new Error(`Pet with id ${pet.id} not found`);

  return data[0];
}

// Delete a pet
export async function deletePet(petId: number): Promise<void> {
  const { error } = await supabase.from("pets").delete().eq("id", petId);
  if (error) throw error;
}
