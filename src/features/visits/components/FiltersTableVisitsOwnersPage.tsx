import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onFilterChange: (filter: "today" | "byDate" | "all", date?: string) => void;
}

export default function FiltersTableVisitsOwnersPage({
  onFilterChange,
}: Props) {
  const { t } = useTranslation("visits");

  const [selected, setSelected] = useState<"today" | "byDate" | "all">("all");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  const handleSelect = (value: "today" | "byDate" | "all") => {
    setSelected(value);
    if (value === "byDate") {
      onFilterChange(value, date);
    } else {
      onFilterChange(value);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    if (selected === "byDate") {
      onFilterChange("byDate", newDate);
    }
  };

  // Initial filter will be today
  useEffect(() => {
    onFilterChange("all");
  }, []);

  return (
    <div className="flex flex-row gap-12 bg-blue-50 py-1 px-5 items-center">
      <label className="flex gap-1.5 text-blue-900 font-bold">
        <input
          type="checkbox"
          checked={selected === "today"}
          onChange={() => handleSelect("today")}
          className="scale-120"
        />
        {t("today")}
      </label>

      <label className="flex gap-1.5 text-blue-900 font-bold">
        <input
          type="checkbox"
          checked={selected === "byDate"}
          onChange={() => handleSelect("byDate")}
          className="scale-120"
        />
        {t("byDate")}
      </label>

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        disabled={selected !== "byDate"}
        className="bg-amber-50 rounded-xs border border-gray-700 px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 -ml-8"
      />

      <label className="flex gap-1.5 text-blue-900 font-bold">
        <input
          type="checkbox"
          checked={selected === "all"}
          onChange={() => handleSelect("all")}
          className="scale-120"
        />
        {t("all")}
      </label>
    </div>
  );
}
