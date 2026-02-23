import type { Visit } from "../../../types/Visit";

interface LabelInputProps {
  label: string;
  visitKey?: keyof Visit;
  visit?: Visit;
  setVisit?: React.Dispatch<React.SetStateAction<Visit | null>>;
  className?: string;
  type?: string;
}

export default function LabelInputVisits({
  label,
  visitKey,
  visit,
  setVisit,
  className = "",
  type = "text",
}: LabelInputProps) {
  const value = visit && visitKey ? String(visit[visitKey] ?? "") : "";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-blue-900 font-bold -mb-1 mt-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (visit && setVisit && visitKey) {
            const newValue =
              type === "date"
                ? e.target.value
                : e.target.value.toUpperCase().trim();

            setVisit({
              ...visit,
              [visitKey]: newValue,
            });
          }
        }}
        className={`bg-amber-50 border border-gray-700 rounded-xs px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}
