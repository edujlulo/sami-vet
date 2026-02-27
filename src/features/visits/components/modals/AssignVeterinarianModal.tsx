import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { useEffect, useRef } from "react";
import Button from "../../../../components/Button";
import LabelInputVisits from "../LabelInputVisits";
import type { VisitEntity } from "../../../../types/VisitEntity";
import { useTranslation } from "react-i18next";

type Props = {
  isOpenAssignVeterinarianModal: boolean;
  selectedVisit: VisitEntity | null;
  setSelectedVisit: React.Dispatch<React.SetStateAction<VisitEntity | null>>;
  emptyVisit: VisitEntity;
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
  const { t } = useTranslation("visits");

  const nodeRef = useRef<HTMLDivElement>(null);

  if (!isOpenAssignVeterinarianModal) return null;

  const veterinarianInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    veterinarianInputRef.current?.focus();
  }, [AssignVeterinarianModal]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit por defecto si hay un form
      handleSaveVisit();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-gray-700/30">
      <Draggable
        nodeRef={nodeRef}
        handle=".modal-header"
        defaultPosition={{
          x: window.innerWidth / 2 - 200, // centrar horizontalmente (modal 400px)
          y: window.innerHeight / 2 - 140, // aproximado mitad altura
        }}
      >
        <div
          ref={nodeRef}
          className="absolute bg-amber-50 rounded-lg border border-gray-700 w-[400px] shadow-xl overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {/* Header estilo ventana */}
          <div className="modal-header cursor-move bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="font-semibold text-lg">{t("assignVeterinarian")}</h2>

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
            {/* Veterinarian */}
            <div className="mb-14">
              <LabelInputVisits
                label={t("veterinarian")}
                visitKey="vet"
                visit={selectedVisit ?? emptyVisit}
                setVisit={setSelectedVisit}
                className="bg-white h-9"
                inputRef={veterinarianInputRef}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-6">
              <Button
                name={t("saveVisit")}
                onClick={handleSaveVisit}
                className="!border-blue-500 hover:!border-blue-900 hover:!bg-blue-50 !w-40"
              />

              <Button
                name={t("exit")}
                onClick={handleCancelVisit}
                className="text-red-900 border-red-400 hover:bg-red-50 hover:border-red-300 !w-20"
              />
            </div>
          </div>
        </div>
      </Draggable>
    </div>,
    document.body,
  );
};

export default AssignVeterinarianModal;
