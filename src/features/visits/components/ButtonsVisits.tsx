import Button from "../../../components/Button";

export default function ButtonsVisits() {
  return (
    <div>
      <p className="flex items-center justify-center text-blue-900 font-bold">
        Visitas
      </p>
      <div className="flex flex-row gap-2 overflow-x-auto bg-amber-200 py-4 px-2">
        {/* Columna 1 */}
        <div className="flex flex-col gap-1">
          <Button name="Agregar" className="h-auto" />
          <Button name="Anular" className="h-auto" />
          <Button name="Caja" className="h-auto" />
          <Button name="Presupuestos" className="h-auto" />
          <Button name="Pendientes" className="h-auto" />
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col gap-1">
          <Button name="Modificar" className="h-auto" />
          <Button name="Facturar" className="h-auto" />
          <Button name="Detalles" className="h-auto" />
          <Button name="Reportes" className="h-auto" />
          <Button name="Salir" className="h-auto text-red-900" />
        </div>
      </div>
    </div>
  );
}
