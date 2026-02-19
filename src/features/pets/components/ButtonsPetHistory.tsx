import Button from "../../../components/Button";
import type { Pet } from "../../../types/Pet";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  handleSave: () => void;
  handleNew: () => void;
  handleDeletePet: () => void;
  isEditing: boolean;
  isCreating: boolean;
  selectedPet: Pet | null;
  emptyPet: Pet;
}

export default function ButtonsPetHistory({
  setIsEditing,
  handleCancel,
  handleSave,
  handleNew,
  handleDeletePet,
  isEditing,
  isCreating,
  selectedPet,
  emptyPet,
}: Props) {
  return (
    <div className="bg-amber-200 py-2 px-2 mt-4">
      <div className="flex flex-col gap-1 overflow-x-auto">
        {/* Row 1 */}
        <div className="flex flex-row gap-1">
          <Button
            name="Nuevo"
            onClick={handleNew}
            disabled={isEditing || isCreating}
            className="h-auto"
          />
          <Button
            name="Modificar"
            onClick={() => setIsEditing(true)}
            disabled={
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet) ||
              isCreating
            }
            className="h-auto"
          />
          <Button
            name="Guardar"
            onClick={handleSave}
            disabled={!isEditing && !isCreating}
            className="h-auto"
          />
          <Button
            name="Cancelar"
            onClick={handleCancel}
            disabled={
              !isEditing &&
              !isCreating &&
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet)
            }
            className="h-auto"
          />
          <Button
            name="Eliminar"
            onClick={handleDeletePet}
            disabled={
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet) ||
              isCreating
            }
            className="h-auto"
          />
        </div>
        {/* Row 2 */}
        <div className="flex flex-row gap-1">
          <Button name="Pruebas" className="h-auto" />
          <Button name="Tratamiento" className="h-auto" />
          <Button name="Certificado" className="h-auto" />
          <Button name="Estadísticas" className="h-auto" />
          <Button name="Informe" className="h-auto" />
        </div>
      </div>
    </div>
  );
}
