import { useEffect, useState } from "react";
import Button from "../../components/Button";

function OwnersTable() {
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState({
    id: null,
    name: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/owners")
      .then((res) => res.json())
      .then((data) => setOwners(data))
      .catch((error) => console.error("Error fetching owners:", error));
  }, []);

  // Nuevo
  function handleNew() {
    setSelectedOwner({ id: null, name: "", email: "" });
    setIsCreating(true);
    setIsEditing(false);
  }

  // Cancelar
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedOwner({ id: null, name: "", email: "" });
  }

  // Guardar
  function handleSave() {
    if (isEditing) {
      fetch(`http://localhost:3001/owners/${selectedOwner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedOwner.name,
          email: selectedOwner.email,
        }),
      })
        .then((res) => res.json())
        .then((updatedOwner) => {
          setOwners(
            owners.map((o) => (o.id === updatedOwner.id ? updatedOwner : o))
          );
          setIsEditing(false);
          setSelectedOwner(updatedOwner);
        });
    } else if (isCreating) {
      fetch("http://localhost:3001/owners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedOwner.name,
          email: selectedOwner.email,
        }),
      })
        .then((res) => res.json())
        .then((newOwner) => {
          setOwners([...owners, newOwner]);
          setIsCreating(false);
          setSelectedOwner(newOwner);
        });
    }
  }

  // Seleccionar fila
  function handleSelect(owner) {
    setSelectedOwner(owner);
    setIsEditing(false);
    setIsCreating(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-amber-100 border-20 border-amber-400 p-20 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-row gap-8">
          <form className="bg-amber-200 p-4 flex flex-col gap-2">
            <label>Name:</label>
            <input
              type="text"
              value={selectedOwner.name}
              onChange={(e) =>
                setSelectedOwner({ ...selectedOwner, name: e.target.value })
              }
              disabled={!isEditing && !isCreating}
              className="bg-amber-50 border border-gray-700"
            />
            <label>Email:</label>
            <input
              type="text"
              value={selectedOwner.email}
              onChange={(e) =>
                setSelectedOwner({ ...selectedOwner, email: e.target.value })
              }
              disabled={!isEditing && !isCreating}
              className="bg-amber-50 border border-gray-700"
            />
          </form>
          <div className="flex flex-col gap-2">
            <Button
              name="Modificar"
              onClick={() => setIsEditing(true)}
              disabled={selectedOwner.id === null || isCreating}
            />
            <Button
              name="Guardar"
              onClick={handleSave}
              disabled={!isEditing && !isCreating}
            />
            <Button
              name="Cancelar"
              onClick={handleCancel}
              disabled={!isEditing && !isCreating}
            />
            <Button
              name="Nuevo"
              onClick={handleNew}
              disabled={isEditing || isCreating}
            />
          </div>
        </div>

        <table border="1" cellPadding="10" className="bg-amber-50">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {owners.map((owner) => (
              <tr
                key={owner.id}
                onClick={() => handleSelect(owner)}
                className="cursor-pointer hover:bg-amber-200"
              >
                <td>{owner.id}</td>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OwnersTable;
