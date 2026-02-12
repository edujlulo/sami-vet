import LabelInput from "../../components/LabelInput";

export default function FormOwners({
  selectedOwner,
  setSelectedOwner,
  isEditing,
  isCreating,
}) {
  return (
    <div>
      <form className="bg-amber-200 p-4 flex flex-row gap-2">
        <LabelInput
          label={"Apellidos"}
          type="text"
          value={selectedOwner.surname}
          onChange={(e) =>
            setSelectedOwner({ ...selectedOwner, surname: e.target.value })
          }
          disabled={!isEditing && !isCreating}
        />
        <LabelInput
          label={"Nombres"}
          type="text"
          value={selectedOwner.name}
          onChange={(e) =>
            setSelectedOwner({ ...selectedOwner, name: e.target.value })
          }
          disabled={!isEditing && !isCreating}
        />
        <LabelInput
          label={"Cédula"}
          type="text"
          value={selectedOwner.idCardNumber}
          onChange={(e) =>
            setSelectedOwner({ ...selectedOwner, idCardNumber: e.target.value })
          }
          disabled={!isEditing && !isCreating}
        />

        <LabelInput
          label={"R.I.F."}
          type="text"
          value={selectedOwner.rif}
          onChange={(e) =>
            setSelectedOwner({ ...selectedOwner, rif: e.target.value })
          }
          disabled={!isEditing && !isCreating}
        />
      </form>
    </div>
  );
}
