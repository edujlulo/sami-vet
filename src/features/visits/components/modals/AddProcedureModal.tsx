import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (procedure: string, cost: string) => void;
};

const AddProcedureModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [procedure, setProcedure] = useState("");
  const [cost, setCost] = useState("");

  if (!isOpen) return null; // It doesn't render nothing if modal is closed

  const handleContinue = () => {
    onContinue(procedure, cost);
    setProcedure("");
    setCost("");
  };

  const handleClose = () => {
    setProcedure("");
    setCost("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Procedimiento</h2>

        {/* Procedure */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Procedimiento</label>
          <input
            type="text"
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Cost */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Costo</label>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="text-red-500 font-semibold px-4 py-2 rounded border border-red-500 hover:bg-red-50"
          >
            Salir
          </button>
          <button
            onClick={handleContinue}
            className="text-blue-500 font-semibold px-4 py-2 rounded border border-blue-500 hover:bg-blue-50"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProcedureModal;
