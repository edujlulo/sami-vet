import { useEffect, useState } from "react";
import { useVisitsContext } from "../context/VisitsContext";
import LabelInputVisits from "./LabelInputVisits";
import { useVisits } from "../hooks/useVisits";

export default function FormVisits() {
  const { selectedVisit, setSelectedVisit, emptyVisit } = useVisitsContext();
  const { setIsEditing, setIsCreating, handleSaveVisit } = useVisits();

  // ========== STATE ==========
  const [isDirty, setIsDirty] = useState(false); // tracks if input has changes

  // ========== DEBOUNCE SAVE (2 SECONDS) ==========
  // Saves the visit if the user stops typing for 2 seconds
  useEffect(() => {
    if (!isDirty) return; // do nothing if no changes

    const timeout = setTimeout(() => {
      handleSaveVisit(); // save to Supabase
      setIsDirty(false); // reset dirty state
      console.log("Debounce save sent to Supabase");
    }, 2000); // 2-second debounce

    return () => clearTimeout(timeout); // clear timeout if user keeps typing
  }, [selectedVisit]);

  // ========== INPUT HANDLERS ==========
  const handleInputChange = () => {
    setIsDirty(true); // mark as dirty to trigger debounce save
  };

  const handleInputFocus = () => {
    setIsEditing(true); // mark as editing
    setIsCreating(false); // disable creating mode
  };

  const handleBlurSave = () => {
    if (!isDirty) return; // do nothing if no changes
    handleSaveVisit(); // save immediately on blur
    setIsDirty(false); // reset dirty state
    console.log("Saved on blur");
  };

  // ========== RENDER ==========
  return (
    <div className="bg-amber-400 py-6 px-2">
      <div className="flex flex-row gap-4">
        <LabelInputVisits
          label="Médico consulta"
          visitKey="vet"
          visit={selectedVisit}
          disable={true}
          className="w-60"
        />
        <LabelInputVisits
          label="Peso"
          visitKey="weightKg"
          visit={selectedVisit}
          setVisit={setSelectedVisit}
          disable={
            !selectedVisit ||
            JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
          }
          onChange={handleInputChange}
          onBlur={handleBlurSave}
          onFocus={handleInputFocus}
          className="w-20"
        />
      </div>
      <LabelInputVisits
        label="Motivo"
        visitKey="reasonForVisit"
        visit={selectedVisit}
        setVisit={setSelectedVisit}
        disable={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onChange={handleInputChange}
        onBlur={handleBlurSave}
        onFocus={handleInputFocus}
        className="w-140 h-20"
      />
      <LabelInputVisits
        label="Examen físico"
        visitKey="physicalExamination"
        visit={selectedVisit}
        setVisit={setSelectedVisit}
        disable={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onChange={handleInputChange}
        onBlur={handleBlurSave}
        onFocus={handleInputFocus}
        className="w-140 h-20"
      />
      <LabelInputVisits
        label="Diagnóstico - Comentarios"
        visitKey="diagnosis"
        visit={selectedVisit}
        setVisit={setSelectedVisit}
        disable={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onChange={handleInputChange}
        onBlur={handleBlurSave}
        onFocus={handleInputFocus}
        className="w-100"
      />

      {/* Notes input */}
      <input
        type="text"
        value={selectedVisit?.notes ?? ""}
        onChange={(e) => {
          handleInputChange();

          if (selectedVisit && setSelectedVisit) {
            setSelectedVisit({
              ...selectedVisit,
              ["notes"]: e.target.value,
            });
          }
        }}
        onBlur={handleBlurSave}
        disabled={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onFocus={handleInputFocus}
        className="bg-amber-50 rounded-xs border border-gray-700 w-140 h-20 mt-2 px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <LabelInputVisits
        label="Pruebas complementarias"
        visitKey="additionalTests"
        visit={selectedVisit}
        setVisit={setSelectedVisit}
        disable={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onChange={handleInputChange}
        onBlur={handleBlurSave}
        onFocus={handleInputFocus}
        className="w-140 h-20"
      />
      <LabelInputVisits
        label="Tratamiento en consulta"
        visitKey="treatmentGiven"
        visit={selectedVisit}
        setVisit={setSelectedVisit}
        disable={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onChange={handleInputChange}
        onBlur={handleBlurSave}
        onFocus={handleInputFocus}
        className="w-140 h-20"
      />
      <LabelInputVisits
        label="Tratamiento"
        visitKey="prescribedTreatment"
        visit={selectedVisit}
        setVisit={setSelectedVisit}
        disable={
          !selectedVisit ||
          JSON.stringify(selectedVisit) === JSON.stringify(emptyVisit)
        }
        onChange={handleInputChange}
        onBlur={handleBlurSave}
        onFocus={handleInputFocus}
        className="w-140 h-35"
      />
    </div>
  );
}
