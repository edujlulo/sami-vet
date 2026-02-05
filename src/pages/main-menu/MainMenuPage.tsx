import { Link } from "react-router-dom";
import Button from "./Button";

export default function MainMenuPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center justify-center p-10 bg-amber-200 rounded-md border border-amber-600 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        {/* Titulo */}
        <h1 className="text-3xl font-semibold text-gray-800 tracking-wide mb-2 pb-2">
          MENU PRINCIPAL
        </h1>

        {/* Main box */}
        <div className="flex flex-row gap-6 px-4">
          {/* Left box */}
          <div className="flex flex-col gap-1 bg-amber-100 p-5 border border-amber-500 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <Link
              to="/patients"
              className="bg-amber-50 border border-gray-300 rounded-md py-1 cursor-pointer shadow-sm hover:bg-green-50 hover:border-green-300 hover:shadow-md transform hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 w-40 text-center transition-all duration-150 ease-in-out"
            >
              Localizador
            </Link>

            <Button name="Bancos" />
            <Button name="Estado" />
            <Button name="Seguridad" />
            <Button name="Configurar" />
            <Button name="Respaldo" />
            <Button name="Seguros" />
          </div>

          {/* Central box */}
          <div className="flex flex-col gap-1 p-5">
            <div className="mt-auto -mb-6 bg-orange-400 py-2 px-8 rounded border border-amber-700 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <button
                className=" bg-amber-50 border border-gray-300 rounded-md py-1 cursor-pointer shadow-sm hover:bg-green-50 hover:border-green-300 hover:shadow-md transform hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 w-30 text-center transition-all duration-150 ease-in-out"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.reload();
                }}
              >
                Salir
              </button>
            </div>
          </div>

          {/* Right box */}
          <div className="flex flex-col gap-1 bg-amber-100 p-5 border border-amber-500 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <Button name="Médicos" />
            <Button name="Empleado" />
            <Button name="Conceptos" />
            <Button name="Inventario" />
            <Button name="Servicio" />
            <Button name="Proveedores G." />
            <Button name="Procedimientos" />
          </div>
        </div>
      </div>
    </div>
  );
}
