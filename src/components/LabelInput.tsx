import React from "react";
import type { Owner } from "../types/Owner";

interface LabelInputProps {
  label: string;
  ownerKey: keyof Owner; // la propiedad que modificará
  owner: Owner; // el objeto completo
  setOwner: React.Dispatch<React.SetStateAction<Owner>>; // setter
  disabled?: boolean;
  className?: string;
  type?: string;
  isEditing: boolean;
  isCreating: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function LabelInput({
  label,
  ownerKey,
  owner,
  setOwner,
  className = "",
  type = "text",
  isEditing,
  isCreating,
  inputRef,
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={(owner[ownerKey] as string) ?? ""}
        onChange={(e) => setOwner({ ...owner, [ownerKey]: e.target.value })}
        disabled={!isEditing && !isCreating}
        ref={inputRef}
        className={`bg-amber-50 border border-gray-700 ${className}`}
      />
    </div>
  );
}
