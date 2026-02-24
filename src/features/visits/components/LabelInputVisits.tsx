import type { VisitEntity } from "../../../types/VisitEntity";

interface LabelInputProps {
  label: string;
  visitKey?: keyof VisitEntity;
  visit?: VisitEntity | null;
  setVisit?: React.Dispatch<React.SetStateAction<VisitEntity | null>>;
  className?: string;
  type?: string;
  disable?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function LabelInputVisits({
  label,
  visitKey,
  visit,
  setVisit,
  className = "",
  type = "text",
  disable = false,
  inputRef,
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
              type === "date" ? e.target.value : e.target.value.toUpperCase();

            setVisit({
              ...visit,
              [visitKey]: newValue,
            });
          }
        }}
        disabled={disable}
        ref={inputRef}
        className={`bg-amber-50 border border-gray-700 rounded-xs px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}
