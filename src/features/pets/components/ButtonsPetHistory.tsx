import Button from "../../../components/Button";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
}

export default function ButtonsPetHistory({
  setIsEditing,
  handleCancel,
}: Props) {
  return (
    <div className="bg-amber-200 py-2 px-2 mt-4">
      <div className="flex flex-col gap-1 overflow-x-auto">
        {/* Row 1 */}
        <div className="flex flex-row gap-1">
          <Button name="Nuevo" className="h-auto" />
          <Button
            name="Modificar"
            onClick={() => setIsEditing(true)}
            className="h-auto"
          />
          <Button name="Guardar" className="h-auto" />
          <Button name="Cancelar" onClick={handleCancel} className="h-auto" />
          <Button name="Eliminar" className="h-auto" />
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
