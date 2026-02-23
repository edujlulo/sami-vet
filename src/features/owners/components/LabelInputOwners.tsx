import React from "react";
import type { Owner } from "../../../types/Owner";

interface LabelInputProps {
  label: string;
  ownerKey: keyof Owner;
  owner: Owner;
  setOwner?: React.Dispatch<React.SetStateAction<Owner>>;
  disabled?: boolean;
  className?: string;
  type?: string;
  isEditing?: boolean;
  isCreating?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function LabelInputOwners({
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
  // Fields that should always be in lowercase
  const lowercaseFields: (keyof Owner)[] = ["email"];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={(owner[ownerKey] as string) ?? ""}
        onChange={(e) =>
          owner &&
          setOwner?.({
            ...owner,
            [ownerKey]: lowercaseFields.includes(ownerKey)
              ? e.target.value.toLowerCase()
              : e.target.value.toUpperCase(),
          })
        }
        disabled={!setOwner || !(isEditing || isCreating)}
        readOnly={!setOwner || !(isEditing || isCreating)}
        ref={inputRef}
        className={`bg-amber-50 rounded-xs border border-gray-700 px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}
