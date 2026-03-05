import Button from "../../../components/Button";

interface Props {
  setShowInvoicesPage: boolean;
}

export default function InvoicesPage({ setShowInvoicesPage }: Props) {
  return (
    <div>
      <div className="w-[800px] h-[800px] bg-red-300 flex flex-col gap-10 items-center justify-start xl:justify-center overflow-auto">
        <h1 className="">Contenido de la pagina de facturacion</h1>
        <Button name="Salir" onClick={() => setShowInvoicesPage(false)} />
      </div>
    </div>
  );
}
