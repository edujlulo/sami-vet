import LabelInputOwners from "./LabelInputOwners";
import type { Owner } from "../../../types/Owner";
import React, { useRef, useEffect } from "react";

interface FormOwnersProps {
  selectedOwner: Owner;
  setSelectedOwner: React.Dispatch<React.SetStateAction<Owner>>;
  isEditing: boolean;
  isCreating: boolean;
  handleSave: () => void;
}

export default function FormOwners({
  selectedOwner,
  setSelectedOwner,
  isEditing,
  isCreating,
  handleSave,
}: FormOwnersProps) {
  const surnameRef = useRef<HTMLInputElement>(null);

  // initial focus on "Surname"
  useEffect(() => {
    if ((isEditing || isCreating) && surnameRef.current) {
      surnameRef.current.focus();
    }
  }, [isEditing, isCreating]);

  // Form submit when pressing Enter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    handleSave();
  };

  return (
    <div className="flex flex-col bg-amber-300 py-4 gap-0.5">
      <form
        className="bg-amber-300 px-4 py-0 flex flex-col gap-0.5"
        onSubmit={handleSubmit}
      >
        {/* First row */}
        <div className="flex flex-row gap-2">
          <LabelInputOwners
            label="Apellidos"
            ownerKey="surname"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            inputRef={surnameRef}
          />
          <LabelInputOwners
            label="Nombres"
            ownerKey="name"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
          />
          <LabelInputOwners
            label="Cédula"
            ownerKey="idCardNumber"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
          <LabelInputOwners
            label="R.I.F."
            ownerKey="rif"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
        </div>

        {/* Second row */}
        <div className="flex flex-row gap-2">
          <LabelInputOwners
            label="Telf. Habitación"
            ownerKey="homePhone"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-45"
          />
          <LabelInputOwners
            label="Telf. Celular"
            ownerKey="mobilePhone"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-45"
          />
          <LabelInputOwners
            label="Telf. Oficina"
            ownerKey="officePhone"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-45"
          />
        </div>

        {/* Third row */}
        <div className="flex flex-row gap-2">
          <LabelInputOwners
            label="Email"
            ownerKey="email"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-65"
          />
          <LabelInputOwners
            label="Dirección"
            ownerKey="address"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-85"
          />
        </div>

        {/* Fourth row */}
        <div className="flex flex-row gap-2">
          <LabelInputOwners
            label="Urbanización"
            ownerKey="estate"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-60"
          />
          <LabelInputOwners
            label="Persona"
            ownerKey="person"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
          <LabelInputOwners
            label="Contribuyente"
            ownerKey="taxpayer"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
          <LabelInputOwners
            label="Registrado"
            ownerKey="registered"
            owner={selectedOwner}
            setOwner={setSelectedOwner}
            isEditing={isEditing}
            isCreating={isCreating}
            className="w-30"
          />
        </div>

        {/* Hidden submit button for Enter */}
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
}
