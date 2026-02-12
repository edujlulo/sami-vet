import Button from "../../components/Button";

export default function ButtonsOwners({
  setIsEditing,
  selectedOwner,
  isCreating,
  isEditing,
  handleSave,
  handleCancel,
  handleNew,
  handleDelete,
}) {
  return (
    <div className="grid grid-cols-2 gap-2 scale-90 items-start">
      <Button
        name="Nuevo"
        onClick={handleNew}
        disabled={isEditing || isCreating}
        className="h-auto"
      />
      <Button
        name="Modificar"
        onClick={() => setIsEditing(true)}
        disabled={selectedOwner.id === null || isCreating}
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
        disabled={!isEditing && !isCreating}
        className="h-auto"
      />
      <Button
        name="Eliminar"
        onClick={handleDelete}
        disabled={selectedOwner.id === null || isCreating}
        className="h-auto"
      />
      <Button name="Detalles" disabled={true} className="h-auto" />
    </div>
  );
}
