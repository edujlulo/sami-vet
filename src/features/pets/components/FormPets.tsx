import LabelInputPets from "./LabelInputPets";
import TablePetsPetHistoryPage from "./TablePetsPetHistoryPage";

export default function FormPets() {
  return (
    <div className="bg-amber-300 px-10 py-10">
      {/* --- Top box --- */}

      <div className="flex flex-row gap-6">
        <TablePetsPetHistoryPage />
        <div>
          <form className="flex flex-row gap-2">
            <LabelInputPets
              label="Propietario"
              isEditing={true}
              isCreating={true}
              className="w-70"
            />
            <LabelInputPets
              label="N. Cliente"
              isEditing={true}
              isCreating={true}
              className="w-20"
            />
          </form>
          <form className="flex flex-row gap-2">
            <LabelInputPets
              label="Mascota"
              isEditing={true}
              isCreating={true}
            />
            <LabelInputPets
              label="Fech Naci"
              isEditing={true}
              isCreating={true}
              className="w-30"
            />
            <LabelInputPets
              label="Edad"
              isEditing={true}
              isCreating={true}
              className="w-30"
            />
          </form>
        </div>
      </div>

      {/* --- Bottom box --- */}

      <div>
        <form className="flex flex-row gap-2">
          <LabelInputPets label="Especie" isEditing={true} isCreating={true} />
          <LabelInputPets label="Raza" isEditing={true} isCreating={true} />
          <LabelInputPets
            label="Sexo"
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <LabelInputPets
            label="Pdg"
            isEditing={true}
            isCreating={true}
            className="w-8"
          />
        </form>
        <form className="flex flex-row gap-2 items-center">
          <LabelInputPets label="Color" isEditing={true} isCreating={true} />
          <LabelInputPets
            label="Placa"
            isEditing={true}
            isCreating={true}
            className="w-20"
          />
          <LabelInputPets label="Chip" isEditing={true} isCreating={true} />
          <LabelInputPets
            label="Fech Regis"
            isEditing={true}
            isCreating={true}
            className="w-30"
          />
          <button
            className={`
        bg-amber-50
        border border-gray-300
        rounded-md
        py-1
        px-2
        cursor-pointer
        shadow-sm
        hover:bg-green-50
        hover:border-green-300
        hover:shadow-md
        transform
        hover:-translate-y-px
        active:translate-y-0
        transition-all duration-150
        w-20
       text-blue-900
       font-bold
        disabled:text-gray-400
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-200
        ml-5
        self-end
      `}
          >
            Asociar
          </button>
        </form>
      </div>
    </div>
  );
}
