import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import type { Owner } from "../../../types/Owner";

export function useOwners() {
  const [owners, setOwners] = useState<Owner[]>([]);

  const emptyOwner: Owner = {
    id: 0,
    surname: "",
    name: "",
    idCardNumber: "",
    rif: "",
    homePhone: "",
    mobilePhone: "",
    officePhone: "",
    email: "",
    address: "",
    estate: "",
    person: "",
    taxpayer: "",
    registered: "",
    affiliate: false,
  };

  const [selectedOwner, setSelectedOwner] = useState<Owner>(emptyOwner);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    fetchOwners();
  }, []);

  async function fetchOwners() {
    const { data, error } = await supabase.from("owners").select("*");

    if (error) {
      console.error("Error fetching owners:", error);
      return;
    }

    if (data) {
      setOwners(data as Owner[]);
    }
  }

  // ================= NEW =================
  function handleNew() {
    setSelectedOwner(emptyOwner);
    setIsCreating(true);
    setIsEditing(false);
  }

  // ================= CANCEL =================
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedOwner(emptyOwner);
  }

  // ================= SAVE =================
  async function handleSave() {
    if (isEditing) {
      const { data, error } = await supabase
        .from("owners")
        .update(selectedOwner)
        .eq("id", selectedOwner.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating owner:", error);
        return;
      }

      if (data) {
        setOwners((prev) => prev.map((o) => (o.id === data.id ? data : o)));
        setIsEditing(false);
        setSelectedOwner(data);
      }
    }

    if (isCreating) {
      const { data, error } = await supabase
        .from("owners")
        .insert([selectedOwner])
        .select()
        .single();

      if (error) {
        console.error("Error inserting owner:", error);
        return;
      }

      if (data) {
        setOwners((prev) => [...prev, data]);
        setIsCreating(false);
        setSelectedOwner(data);
      }
    }
  }

  // ================= DELETE =================
  async function handleDeleteOwner() {
    if (!selectedOwner.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this owner?",
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("owners")
      .delete()
      .eq("id", selectedOwner.id);

    if (error) {
      console.error("Error deleting owner:", error);
      return;
    }

    setOwners((prev) => prev.filter((o) => o.id !== selectedOwner.id));

    setSelectedOwner(emptyOwner);
    setIsEditing(false);
    setIsCreating(false);
  }

  // ================= SELECT =================
  function handleSelect(owner: Owner) {
    setSelectedOwner(owner);
    setIsEditing(false);
    setIsCreating(false);
  }

  return {
    owners,
    selectedOwner,
    isEditing,
    isCreating,
    setSelectedOwner,
    setIsEditing,
    handleNew,
    handleCancel,
    handleSave,
    handleDeleteOwner,
    handleSelect,
    emptyOwner,
  };
}
