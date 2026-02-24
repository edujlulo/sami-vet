import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { useEffect, useRef } from "react";
import Button from "../../../../components/Button";
import LabelInputVisits from "../LabelInputVisits";
import type { VisitEntity } from "../../../../types/VisitEntity";

type Props = {
  isOpenAddProcedureModal: boolean;
  selectedVisit: VisitEntity | null;
  setSelectedVisit: React.Dispatch<React.SetStateAction<VisitEntity | null>>;
  emptyVisit: VisitEntity;
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
  const nodeRef = useRef<HTMLDivElement>(null);

  if (!isOpenAddProcedureModal) return null;

  const procedureInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpenAddProcedureModal) {
      procedureInputRef.current?.focus();
    }
  }, [isOpenAddProcedureModal]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit por defecto si hay un form
      onContinueAddProcedureModal();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-gray-700/30">
      <Draggable
        nodeRef={nodeRef}
        handle=".modal-header"
        defaultPosition={{
          x: window.innerWidth / 2 - 200, // half of modal width (400px)
          y: window.innerHeight / 2 - 180, // approx half height
        }}
      >
        <div
          ref={nodeRef}
          className="absolute bg-amber-50 rounded-lg border border-gray-700 w-[400px] shadow-xl overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {/* Header estilo ventana */}
          <div className="modal-header cursor-move bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Agregar Procedimiento</h2>

            {/* Botón X */}
            <button
              onClick={handleCancelVisit}
              className="text-white hover:bg-blue-500 rounded px-2 py-1 transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Procedure */}
            <div className="mb-4">
              <LabelInputVisits
                label="Procedimiento"
                visitKey="procedure"
                visit={selectedVisit ?? emptyVisit}
                setVisit={setSelectedVisit}
                className="bg-white h-9"
                inputRef={procedureInputRef}
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
        </div>
      </Draggable>
    </div>,
    document.body
  );
};

export default AddProcedureModal;
