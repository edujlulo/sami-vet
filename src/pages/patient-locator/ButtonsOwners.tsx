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
  handleDelete: () => void;
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
  handleDelete,
  emptyOwner,
}: ButtonsOwnersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
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
          onClick={handleDelete}
          disabled={selectedOwner.id === "" || isCreating}
          className="h-auto"
        />
      </div>

      {/* Columna 2 */}
      <div className="flex flex-col gap-2">
        <Button
          name="Modificar"
          onClick={() => setIsEditing(true)}
          disabled={selectedOwner.id === "" || isCreating}
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
  );
}
