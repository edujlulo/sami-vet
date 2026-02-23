import { createPortal } from "react-dom";
import Button from "../../../../components/Button";
import LabelInputVisits from "../LabelInputVisits";
import type { Visit } from "../../../../types/Visit";

type Props = {
  isOpenAddProcedureModal: boolean;
  selectedVisit: Visit | null;
  setSelectedVisit: React.Dispatch<React.SetStateAction<Visit | null>>;
  emptyVisit: Visit;
  handleCancelVisit: () => void;
  onContinueAddProcedureModal: () => void;
};

const AddProcedureModal: React.FC<Props> = ({
  isOpenAddProcedureModal,
  selectedVisit,
  setSelectedVisit,
  emptyVisit,
  handleCancelVisit,
  onContinueAddProcedureModal,
}) => {
  if (!isOpenAddProcedureModal) return null; // It doesn't render nothing if modal is closed

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/30">
      {/* Modal Box */}
      <div className="bg-amber-50 rounded-lg border border-gray-700 w-[400px] p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Agregar Procedimiento</h2>

        {/* Procedure */}
        <div className="mb-4">
          <LabelInputVisits
            label="Procedimiento"
            visitKey="procedure"
            visit={selectedVisit ?? emptyVisit}
            setVisit={setSelectedVisit}
            className="bg-white h-9"
          />
        </div>

        {/* Cost */}
        <div className="mb-10">
          <LabelInputVisits
            label="Costo"
            visitKey="totalAmount"
            visit={selectedVisit ?? emptyVisit}
            setVisit={setSelectedVisit}
            className="bg-white h-9"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6">
          <Button
            name="Continuar"
            onClick={onContinueAddProcedureModal}
            className="!border-blue-500 hover:!border-blue-900 hover:!bg-blue-50 !w-30"
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

export default AddProcedureModal;
