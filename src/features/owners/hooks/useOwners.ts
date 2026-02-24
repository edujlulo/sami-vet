import { useEffect, useState } from "react";
import type { Owner } from "../../../types/Owner";
import {
  fetchOwnersService,
  insertOwnerService,
  updateOwnerService,
  deleteOwnerService,
} from "../services/ownersService";
import { useOwnersContext } from "../context/OwnersContext";
import { usePetsContext } from "../../pets/context/PetsContext";
import { useVisitsContext } from "../../visits/context/VisitsContext";

export function useOwners() {
  const { selectedOwner, setSelectedOwner, emptyOwner } = useOwnersContext();
  const { setSelectedPet, emptyPet } = usePetsContext();
  const { setSelectedVisit, emptyVisit } = useVisitsContext();
  const [owners, setOwners] = useState<Owner[]>([]);

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
    setSelectedPet(emptyPet);
    setIsCreating(true);
    setIsEditing(false);
  }

  // ================= CANCEL =================
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedOwner(emptyOwner);
    setSelectedPet(emptyPet);
  }

  // ================= SAVE =================
  async function handleSave() {
    if (selectedOwner.surname.trim() === "") {
      // window.alert("Surname is required");
      window.alert("Debe ingresar un apellido");
      return;
    }

    if (selectedOwner.name.trim() === "") {
      // window.alert("First name is required");
      window.alert("Debe ingresar un nombre");
      return;
    }

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
    setSelectedPet(emptyPet);
    if (!selectedOwner.id) return;

    const confirmDelete = window.confirm(
      // "Are you sure you want to delete this pet?"
      "Esta acción eliminará el propietario junto con sus mascotas de forma permanente. ¿Desea continuar?",
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
    setSelectedPet(emptyPet);
    setSelectedVisit(emptyVisit);
    setIsEditing(false);
    setIsCreating(false);
  }

  // ============= SELECT OWNER BY ID =============
  function handleSelectOwnerById(id: number) {
    const owner = owners.find((o) => o.id === id);
    setSelectedOwner(owner ?? emptyOwner);
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
    handleSelectOwnerById,
  };
}
