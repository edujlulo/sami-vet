import Button from "../../components/Button";
import type { Owner } from "../../types/Owner";

interface ButtonsOwnersProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOwner: Owner;
  isCreating: boolean;
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  handleNew: () => void;
  handleDeleteOwner: () => void;
  emptyOwner: Owner;
}

export default function ButtonsOwners({
  setIsEditing,
  selectedOwner,
  isCreating,
  isEditing,
  handleSave,
  handleCancel,
  handleNew,
  handleDeleteOwner,
  emptyOwner,
}: ButtonsOwnersProps) {
  return (
    <div className="bg-amber-200 py-2 px-2 mt-4">
      <p className="flex items-center justify-center text-blue-900 font-bold">
        Propietario
      </p>
      <div className="flex flex-row gap-2 overflow-x-auto">
        {/* Columna 1 */}
        <div className="flex flex-col gap-2">
          <Button
            name="Nuevo"
            onClick={handleNew}
            disabled={isEditing || isCreating}
            className="h-auto"
          />

          <Button
            name="Guardar"
            onClick={handleSave}
            disabled={!isEditing && !isCreating}
            className="h-auto"
          />
          <Button
            name="Eliminar"
            onClick={handleDeleteOwner}
            disabled={selectedOwner.id === 0 || isCreating}
            className="h-auto"
          />
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col gap-2">
          <Button
            name="Modificar"
            onClick={() => setIsEditing(true)}
            disabled={selectedOwner.id === 0 || isCreating}
            className="h-auto"
          />
          <Button
            name="Cancelar"
            onClick={handleCancel}
            disabled={!isEditing && !isCreating && selectedOwner === emptyOwner}
            className="h-auto"
          />

          <Button name="Detalles" disabled={true} className="h-auto" />
        </div>
      </div>
    </div>
  );
}
