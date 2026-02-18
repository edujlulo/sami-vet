import { useEffect, useState } from "react";
import type { Owner } from "../../../types/Owner";
import {
  fetchOwnersService,
  insertOwnerService,
  updateOwnerService,
  deleteOwnerService,
} from "../services/ownersService";
import { useOwnersContext } from "../context/OwnersContext";

export function useOwners() {
  const { selectedOwner, setSelectedOwner } = useOwnersContext();
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

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    fetchOwners();
  }, []);

  async function fetchOwners() {
    try {
      const data = await fetchOwnersService();
      setOwners(data);
    } catch (error) {
      console.error("Error fetching owners:", error);
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
    try {
      if (isEditing) {
        const data = await updateOwnerService(selectedOwner);
        setOwners((prev) => prev.map((o) => (o.id === data.id ? data : o)));
        setIsEditing(false);
        setSelectedOwner(data);
      }

      if (isCreating) {
        const data = await insertOwnerService(selectedOwner);
        setOwners((prev) => [...prev, data]);
        setIsCreating(false);
        setSelectedOwner(data);
      }
    } catch (error) {
      console.error("Error saving owner:", error);
    }
  }

  // ================= DELETE =================
  async function handleDeleteOwner() {
    if (!selectedOwner.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this owner?",
    );
    if (!confirmDelete) return;

    try {
      await deleteOwnerService(selectedOwner.id);
      setOwners((prev) => prev.filter((o) => o.id !== selectedOwner.id));
      setSelectedOwner(emptyOwner);
      setIsEditing(false);
      setIsCreating(false);
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
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
