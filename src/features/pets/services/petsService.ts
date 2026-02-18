import { supabase } from "../../../supabaseClient";
import type { Pet } from "../../../types/Pet";

// Get all pets
export async function fetchPets(): Promise<Pet[]> {
  const { data, error } = await supabase.from("pets").select("*");
  if (error) throw error;
  return data as Pet[];
}

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
  const { data, error } = await supabase
    .from("pets")
    .insert([pet])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update a pet
export async function updatePet(pet: Pet): Promise<Pet> {
  const { data, error } = await supabase
    .from("pets")
    .update(pet)
    .eq("id", pet.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Delete a pet
export async function deletePet(petId: number): Promise<void> {
  const { error } = await supabase.from("pets").delete().eq("id", petId);
  if (error) throw error;
}
