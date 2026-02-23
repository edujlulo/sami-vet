import { createPortal } from "react-dom";
import Button from "../../../../components/Button";
import LabelInputVisits from "../LabelInputVisits";
import type { Visit } from "../../../../types/Visit";

type Props = {
  isOpenAssignVeterinarianModal: boolean;
  selectedVisit: Visit | null;
  setSelectedVisit: React.Dispatch<React.SetStateAction<Visit | null>>;
  emptyVisit: Visit;
  handleCancelVisit: () => void;
  handleSaveVisit: () => void;
};

const AssignVeterinarianModal: React.FC<Props> = ({
  isOpenAssignVeterinarianModal,
  selectedVisit,
  setSelectedVisit,
  emptyVisit,
  handleCancelVisit,
  handleSaveVisit,
}) => {
  if (!isOpenAssignVeterinarianModal) return null; // It doesn't render nothing if modal is closed

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/30">
      {/* Modal Box */}
      <div className="bg-amber-50 rounded-lg border border-gray-700 w-[400px] p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Agregar Médico</h2>

        {/* Veterinarian */}
        <div className="mb-14">
          <LabelInputVisits
            label="Médico"
            visitKey="vet"
            visit={selectedVisit ?? emptyVisit}
            setVisit={setSelectedVisit}
            className="bg-white h-9"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6">
          <Button
            name="Guardar visita"
            onClick={handleSaveVisit}
            className="!border-blue-500 hover:!border-blue-900 hover:!bg-blue-50 !w-40"
          />

          <Button
            name="Salir"
            onClick={handleCancelVisit}
            className="text-red-900 border-red-400 hover:bg-red-50 hover:border-red-300 !w-20"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AssignVeterinarianModal;
