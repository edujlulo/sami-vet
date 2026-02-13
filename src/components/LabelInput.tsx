import React from "react";

interface LabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function LabelInput({
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-amber-50 border border-gray-700"
      />
    </div>
  );
}
