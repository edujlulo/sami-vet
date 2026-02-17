interface LabelInputProps {
  label: string;
  className?: string;
  type?: string;
}

export default function LabelInputVisits({
  label,
  className = "",
  type = "text",
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        className={`bg-amber-50 border border-gray-700 ${className}`}
      />
    </div>
  );
}
