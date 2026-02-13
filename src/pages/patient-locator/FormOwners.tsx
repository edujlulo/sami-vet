import LabelInput from "../../components/LabelInput";
import type { Owner } from "../../types/Owner";
import React, { useRef, useEffect } from "react";

interface FormOwnersProps {
  selectedOwner: Owner;
  setSelectedOwner: React.Dispatch<React.SetStateAction<Owner>>;
  isEditing: boolean;
  isCreating: boolean;
}

export default function FormOwners({
  selectedOwner,
  setSelectedOwner,
  isEditing,
  isCreating,
}: FormOwnersProps) {
  // ref para el input de apellidos
  const surnameRef = useRef<HTMLInputElement>(null);

  // useEffect para enfocarlo cuando isEditing o isCreating cambien a true
  useEffect(() => {
    if ((isEditing || isCreating) && surnameRef.current) {
      surnameRef.current.focus();
    }
  }, [isEditing, isCreating]);
  return (
    <div className="flex flex-col bg-amber-200 py-4 gap-0.5">
      <form className="bg-amber-200 px-4 py-0 flex flex-row gap-2">
        <LabelInput
          label="Apellidos"
          ownerKey="surname"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          inputRef={surnameRef}
        />
        <LabelInput
          label="Nombres"
          ownerKey="name"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
        />
        <LabelInput
          label="Cédula"
          ownerKey="idCardNumber"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-30"
        />
        <LabelInput
          label="R.I.F."
          ownerKey="rif"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-30"
        />
      </form>
      <form className="bg-amber-200 px-4 py-0 flex flex-row gap-2">
        <LabelInput
          label="Telf. Habitación"
          ownerKey="homePhone"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-45"
        />
        <LabelInput
          label="Telf. Celular"
          ownerKey="mobilePhone"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-45"
        />
        <LabelInput
          label="Telf. Oficina"
          ownerKey="officePhone"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-45"
        />
      </form>
      <form className="bg-amber-200 px-4 py-0 flex flex-row gap-2">
        <LabelInput
          label="Email"
          ownerKey="email"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-65"
        />
        <LabelInput
          label="Dirección"
          ownerKey="address"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-85"
        />
      </form>
      <form className="bg-amber-200 px-4 py-0 flex flex-row gap-2">
        <LabelInput
          label="Urbanización"
          ownerKey="estate"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-60"
        />
        <LabelInput
          label="Persona"
          ownerKey="person"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-30"
        />
        <LabelInput
          label="Contribuyente"
          ownerKey="taxpayer"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-30"
        />
        <LabelInput
          label="Registrado"
          ownerKey="registered"
          owner={selectedOwner}
          setOwner={setSelectedOwner}
          isEditing={isEditing}
          isCreating={isCreating}
          className="w-30"
        />
      </form>
    </div>
  );
}
