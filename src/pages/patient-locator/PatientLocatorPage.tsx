import { useEffect, useState } from "react";
import FormOwners from "./FormOwners";
import ButtonsOwners from "./ButtonsOwners";
import TableOwners from "./TableOwners";
import type { Owner } from "../../types/Owner";

export default function PatientLocatorPage() {
  const [owners, setOwners] = useState<Owner[]>([]);

  const emptyOwner: Owner = {
    id: "",
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

  useEffect(() => {
    fetch("http://localhost:3001/owners")
      .then((res) => res.json())
      .then((data) => setOwners(data))
      .catch((error) => console.error("Error fetching owners:", error));
  }, []);

  // Handle new
  function handleNew() {
    setSelectedOwner(emptyOwner);
    setIsCreating(true);
    setIsEditing(false);
  }

  // Handle cancel
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedOwner(emptyOwner);
  }

  // ===================== HANDLE SAVE =====================
  function handleSave() {
    if (isEditing) {
      // editar owner existente
      const ownerId = selectedOwner.id;

      fetch(`http://localhost:3001/owners/${ownerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surname: selectedOwner.surname,
          name: selectedOwner.name,
          idCardNumber: selectedOwner.idCardNumber,
          rif: selectedOwner.rif,
          homePhone: selectedOwner.homePhone,
          mobilePhone: selectedOwner.mobilePhone,
          officePhone: selectedOwner.officePhone,
          email: selectedOwner.email,
          address: selectedOwner.address,
          estate: selectedOwner.estate,
          person: selectedOwner.person,
          taxpayer: selectedOwner.taxpayer,
          registered: selectedOwner.registered,
          affiliate: selectedOwner.affiliate,
        }),
      })
        .then((res) => res.json())
        .then((updatedOwner) => {
          // actualizar estado, asegurando que id sea número
          setOwners((prev) =>
            prev.map((o) =>
              o.id === ownerId
                ? { ...updatedOwner, id: ownerId }
                : { ...o, id: o.id },
            ),
          );

          setIsEditing(false);
          setSelectedOwner({ ...updatedOwner, id: ownerId });
        })
        .catch((err) => console.error("Save error:", err));
    } else if (isCreating) {
      // crear nuevo owner
      const nextId =
        owners.length > 0
          ? Math.max(...owners.map((o) => Number(o.id))) + 1
          : 1;

      fetch("http://localhost:3001/owners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: String(nextId),
          surname: selectedOwner.surname,
          name: selectedOwner.name,
          idCardNumber: selectedOwner.idCardNumber,
          rif: selectedOwner.rif,
          homePhone: selectedOwner.homePhone,
          mobilePhone: selectedOwner.mobilePhone,
          officePhone: selectedOwner.officePhone,
          email: selectedOwner.email,
          address: selectedOwner.address,
          estate: selectedOwner.estate,
          person: selectedOwner.person,
          taxpayer: selectedOwner.taxpayer,
          registered: selectedOwner.registered,
          affiliate: selectedOwner.affiliate,
        }),
      })
        .then((res) => res.json())
        .then((newOwner) => {
          // agregar al estado
          setOwners((prev) => [...prev, { ...newOwner, id: String(nextId) }]);
          setIsCreating(false);
          setSelectedOwner({ ...newOwner, id: String(nextId) });
        })
        .catch((err) => console.error("Save error:", err));
    }
  }

  // ===================== HANDLE DELETE =====================
  function handleDelete() {
    if (selectedOwner.id === null) return;

    const ownerId = selectedOwner.id;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this owner?",
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:3001/owners/${ownerId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);

        // quitar del estado local y forzar id como número
        setOwners((prev) =>
          prev.filter((o) => o.id !== ownerId).map((o) => ({ ...o, id: o.id })),
        );

        // limpiar selección y modos
        setSelectedOwner(emptyOwner);
        setIsEditing(false);
        setIsCreating(false);
      })
      .catch((err) => console.error("Delete error:", err));
  }

  // Seleccionar fila
  function handleSelect(owner: Owner) {
    setSelectedOwner(owner);
    setIsEditing(false);
    setIsCreating(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen scale-90">
      <div className="bg-amber-100 border-20 border-amber-400 px-2 py-20 flex flex-col items-center justify-center gap-8 min-w-[400px]">
        <div className="flex flex-row gap-2">
          <FormOwners
            selectedOwner={selectedOwner}
            setSelectedOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
          />
          <ButtonsOwners
            setIsEditing={setIsEditing}
            selectedOwner={selectedOwner}
            isCreating={isCreating}
            isEditing={isEditing}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleNew={handleNew}
            handleDelete={handleDelete}
            emptyOwner={emptyOwner}
          />
        </div>
        <div className="mr-auto ml-4">
          <TableOwners owners={owners} handleSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}
