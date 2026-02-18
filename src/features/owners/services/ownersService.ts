import { supabase } from "../../../supabaseClient";
import type { Owner } from "../../../types/Owner";
import { normalizeStringsData } from "../../../helpers/normalizeStrings";

// Obtener todos los owners
export async function fetchOwnersService(): Promise<Owner[]> {
  const { data, error } = await supabase.from("owners").select("*");
  if (error) throw error;
  return data as Owner[];
}

// Insertar un owner
export async function insertOwnerService(owner: Owner): Promise<Owner> {
  const normalizedOwner = normalizeStringsData(owner);

  // Remove id so Supabase auto-generates it
  const { id, ...ownerWithoutId } = normalizedOwner;

  const { data, error } = await supabase
    .from("owners")
    .insert([ownerWithoutId])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Actualizar un owner
export async function updateOwnerService(owner: Owner): Promise<Owner> {
  const normalizedOwner = normalizeStringsData(owner);

  const { data, error } = await supabase
    .from("owners")
    .update(normalizedOwner)
    .eq("id", owner.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Eliminar un owner
export async function deleteOwnerService(ownerId: number): Promise<void> {
  const { error } = await supabase.from("owners").delete().eq("id", ownerId);
  if (error) throw error;
}
