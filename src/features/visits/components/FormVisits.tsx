import LabelInputVisits from "./LabelInputVisits";

export default function FormVisits() {
  return (
    <div className="bg-amber-400 py-6 px-2">
      <div className="flex flex-row gap-4">
        <LabelInputVisits label="Médico consulta" className="w-60" />
        <LabelInputVisits label="Peso" className="w-20" />
      </div>
      <LabelInputVisits label="Motivo" className="w-140 h-20" />
      <LabelInputVisits label="Examen físico" className="w-140 h-20" />
      <LabelInputVisits label="Diagnóstico - Comentarios" className="w-100" />
      <input
        type="text"
        className={`bg-amber-50 border border-gray-700 w-140 h-20 mt-2`}
      />
      <LabelInputVisits
        label="Pruebas complementarias"
        className="w-140 h-20"
      />
      <LabelInputVisits
        label="Tratamiento en consulta"
        className="w-140 h-20"
      />
      <LabelInputVisits label="Tratamiento" className="w-140 h-35" />
    </div>
  );
}
