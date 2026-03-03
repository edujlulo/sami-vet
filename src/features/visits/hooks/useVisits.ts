import { useEffect, useState } from "react";
import type { VisitEntity } from "../../../types/VisitEntity";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";
import { useVisitsContext } from "../context/VisitsContext";
import {
  deleteVisit,
  fetchVisitsByDate,
  fetchVisitsService,
  insertVisit,
  updateVisit,
} from "../services/visitsService";
import { usePetsContext } from "../../pets/context/PetsContext";
import { usePetsByOwner } from "../../pets/hooks/usePetsByOwner";
import { useOwnersContext } from "../../owners/context/OwnersContext";

export function useVisits() {
  const { selectedVisit, setSelectedVisit, emptyVisit } = useVisitsContext();
  const { selectedPet, setSelectedPet, emptyPet } = usePetsContext();
  const { selectedOwner } = useOwnersContext();

  const { pets } = usePetsByOwner(selectedOwner.id);

  // 🔹 STATE VISITS (ahora vive aquí)
  const [visits, setVisits] = useState<VisitWithRelations[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [isOpenAddProcedureModal, setIsOpenAddProcedureModal] = useState(false);
  const [isOpenAssignVeterinarianModal, setIsOpenAssignVeterinarianModal] =
    useState(false);

  function toVisitWithRelations(
    visit: VisitEntity,
    selectedOwner: { id: number; name: string; surname: string },
    selectedPet: { id: number; name: string },
  ): VisitWithRelations {
    return {
      id: visit.id,
      petId: selectedPet.id!,
      ownerId: selectedOwner.id,
      invoiceNumber: visit.invoiceNumber || "",
      visitDate: visit.visitDate || "",
      petName: selectedPet.name,
      ownerSurname: selectedOwner.surname,
      ownerName: selectedOwner.name,
      procedure: visit.procedure || "",
      vet: visit.vet || "",
      h: visit.h || "",
      ex: visit.ex || "",
      referredBy: visit.referredBy || "",
      totalAmount: visit.totalAmount || "",
      weightKg: visit.weightKg || "",
      reasonForVisit: visit.reasonForVisit || "",
      physicalExamination: visit.physicalExamination || "",
      diagnosis: visit.diagnosis || "",
      notes: visit.notes || "",
      additionalTests: visit.additionalTests || "",
      treatmentGiven: visit.treatmentGiven || "",
      prescribedTreatment: visit.prescribedTreatment || "",
    };
  }

  // =========== SELECT PET AFTER SELECTED VISIT ============
  useEffect(() => {
    if (!selectedVisit || pets.length === 0) return;

    const petFromVisit = pets.find((p) => p.id === selectedVisit.petId);
    if (petFromVisit) {
      setSelectedPet(petFromVisit);
    }
  }, [selectedVisit, pets]);

  // ================= NEW =================
  function handleNewVisit() {
    if (JSON.stringify(selectedPet) === JSON.stringify(emptyPet)) {
      window.alert("Debe tener una mascota seleccionada");
      return;
    }

    setSelectedVisit(emptyVisit);
    setIsOpenAddProcedureModal(true);
    setIsCreating(true);
    setIsEditing(false);
  }

  // ================= EDIT =================
  function handleEditVisit() {
    if (JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)) {
      window.alert("Debe tener una visita seleccionada");
      return;
    }

    setIsOpenAddProcedureModal(true);
    setIsCreating(false);
    setIsEditing(true);
  }

  // ================= CANCEL =================
  function handleCancelVisit() {
    setIsCreating(false);
    setIsEditing(true);
    setSelectedVisit(emptyVisit);
    setIsOpenAddProcedureModal(false);
    setIsOpenAssignVeterinarianModal(false);
  }

  // ================= SAVE =================
  async function handleSaveVisit() {
    if (!selectedPet?.id) {
      window.alert("La mascota seleccionada no tiene un ID válido");
      return;
    }

    if (!selectedOwner?.id) {
      window.alert("El propietario seleccionado no tiene un ID válido");
      return;
    }

    if (!selectedVisit?.vet?.trim()) {
      window.alert("Debe ingresar un médico");
      return;
    }

    try {
      const visitToSave: VisitEntity = {
        ...selectedVisit,
        petId: selectedPet.id,
        visitDate:
          selectedVisit.visitDate || new Date().toISOString().split("T")[0],
      };

      if (isCreating) {
        const savedVisit = await insertVisit(visitToSave);
        const visitWithRelations = toVisitWithRelations(
          savedVisit,
          selectedOwner,
          {
            id: selectedPet.id,
            name: selectedPet.name,
          },
        );
        addVisit(visitWithRelations); // ✅ actualización automática de la tabla
        setSelectedVisit(visitWithRelations);
        setIsCreating(false);
        setIsOpenAssignVeterinarianModal(false);
        setIsEditing(true);
      } else if (isEditing) {
        const savedVisit = await updateVisit(visitToSave);
        const visitWithRelations = toVisitWithRelations(
          savedVisit,
          selectedOwner,
          {
            id: selectedPet.id,
            name: selectedPet.name,
          },
        );
        updateVisitInArray(visitWithRelations); // ✅ actualización automática de la tabla
        setIsOpenAssignVeterinarianModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ================= DELETE =================
  async function handleDeleteVisit() {
    if (!selectedVisit?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visit?",
    );
    if (!confirmDelete) return;

    try {
      await deleteVisit(selectedVisit.id);
      // await fetchVisits();
      setSelectedVisit(emptyVisit);
      setIsCreating(false);
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  }

  // ================= SELECT =================
  function handleSelectVisit(visit: VisitWithRelations) {
    setSelectedVisit(visit);
    setIsEditing(true);
    setIsCreating(false);
  }

  // ============ ON CONTINUE AddProcedureModal.tsx ==============
  function onContinueAddProcedureModal() {
    if (!selectedVisit?.procedure?.trim()) {
      alert("Debe ingresar un procedimiento");
      return;
    }
    setIsOpenAssignVeterinarianModal(true);
    setIsOpenAddProcedureModal(false);
  }

  // ================= LOAD ALL =================
  const loadVisitsAll = async () => {
    try {
      setLoading(true);

      const data = await fetchVisitsService();
      setVisits(data);
    } catch (error) {
      console.error("Error loading visits:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD BY DATE =================
  const loadVisitsByDate = async (date: string) => {
    try {
      setLoading(true);
      const data = await fetchVisitsByDate(date);
      setVisits(data);
    } catch (error) {
      console.error("Error loading visits by date:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD TODAY =================
  const loadVisitsToday = async () => {
    const today = new Date().toISOString().split("T")[0];
    await loadVisitsByDate(today);
  };

  // ================= HANDLE FILTER =================
  const handleFilterChange = (
    filter: "today" | "byDate" | "all",
    date?: string,
  ) => {
    if (filter === "today") {
      loadVisitsToday();
    } else if (filter === "byDate" && date) {
      loadVisitsByDate(date);
    } else {
      loadVisitsAll();
    }
  };

  // ============ Add new visit after created ============
  const addVisit = (visit: VisitWithRelations) => {
    setVisits((prev) => [visit, ...prev]);
  };

  // ============ Update visit after edited ============
  const updateVisitInArray = (visit: VisitWithRelations) => {
    setVisits((prev) => prev.map((v) => (v.id === visit.id ? visit : v)));
  };

  return {
    handleSelectVisit,
    handleCancelVisit,
    handleSaveVisit,
    handleNewVisit,
    handleEditVisit,
    handleDeleteVisit,
    selectedVisit,
    setSelectedVisit,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
    emptyVisit,
    isOpenAddProcedureModal,
    onContinueAddProcedureModal,
    isOpenAssignVeterinarianModal,
    visits,
    loading,
    handleFilterChange,
  };
}
