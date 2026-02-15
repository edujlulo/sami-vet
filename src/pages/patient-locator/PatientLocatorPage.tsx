import { useEffect, useState } from "react";
import FormOwners from "./FormOwners";
import ButtonsOwners from "./ButtonsOwners";
import TableOwners from "./TableOwners";
import type { Owner } from "../../types/Owner";
import TablePets from "./TablePets";
import { supabase } from "../../supabaseClient";
import TableVisits from "./TableVisits";
import ButtonsVisits from "./ButtonsVisits";

export default function PatientLocatorPage() {
  const [owners, setOwners] = useState<Owner[]>([]);

  const emptyOwner: Owner = {
    id: 0,
    surname: "",
    name: "",
    idCardNumber: "",
    rif: "",
    homePhone: "",
    mobilePhone: "",
    officePhone: "",
    email: "",
    address: "",
    estate: "",
    person: "",
    taxpayer: "",
    registered: "",
    affiliate: false,
  };

  const [selectedOwner, setSelectedOwner] = useState<Owner>(emptyOwner);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Original:

  useEffect(() => {
    supabase
      .from("owners")
      .select("*") // Select all columns
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching owners:", error);
        } else if (data) {
          setOwners(data as Owner[]); // <--- forzamos tipo
        }
      });
  }, []);

  // For test supabase:

  // useEffect(() => {
  //   const testConnection = async () => {
  //     const { data, error } = await supabase.from("owners").select("*");

  //     console.log("DATA:", data);
  //     console.log("ERROR:", error);
  //   };

  //   testConnection();
  // }, []);

  // Handle new
  function handleNew() {
    setSelectedOwner(emptyOwner);
    setIsCreating(true);
    setIsEditing(false);
  }

  // Handle cancel
  function handleCancel() {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedOwner(emptyOwner);
  }

  // ===================== HANDLE SAVE =====================
  function handleSave() {
    if (isEditing) {
      (async () => {
        try {
          const { data, error } = await supabase
            .from("owners")
            .update({
              surname: selectedOwner.surname,
              name: selectedOwner.name,
              idCardNumber: selectedOwner.idCardNumber,
              rif: selectedOwner.rif,
              homePhone: selectedOwner.homePhone,
              mobilePhone: selectedOwner.mobilePhone,
              officePhone: selectedOwner.officePhone,
              email: selectedOwner.email,
              address: selectedOwner.address,
              estate: selectedOwner.estate,
              person: selectedOwner.person,
              taxpayer: selectedOwner.taxpayer,
              registered: selectedOwner.registered,
              affiliate: selectedOwner.affiliate,
            })
            .eq("id", selectedOwner.id)
            .select()
            .single();
          if (error) throw error;
          if (data) {
            setOwners((prev) => prev.map((o) => (o.id === data.id ? data : o)));
            setIsEditing(false);
            setSelectedOwner(data);
          }
        } catch (err) {
          console.error("Error updating owner:", err);
        }
      })();
    } else if (isCreating) {
      // crear nuevo owner
      (async () => {
        try {
          const { data, error } = await supabase
            .from("owners")
            .insert([
              {
                surname: selectedOwner.surname,
                name: selectedOwner.name,
                idCardNumber: selectedOwner.idCardNumber,
                rif: selectedOwner.rif,
                homePhone: selectedOwner.homePhone,
                mobilePhone: selectedOwner.mobilePhone,
                officePhone: selectedOwner.officePhone,
                email: selectedOwner.email,
                address: selectedOwner.address,
                estate: selectedOwner.estate,
                person: selectedOwner.person,
                taxpayer: selectedOwner.taxpayer,
                registered: selectedOwner.registered,
                affiliate: selectedOwner.affiliate,
              },
            ])
            .select()
            .single();
          if (error) throw error;
          if (data) {
            setOwners((prev) => [...prev, data]);
            setIsCreating(false);
            setSelectedOwner(data);
          }
        } catch (err) {
          console.error("Error inserting owner:", err);
        }
      })();
    }
  }

  // ===================== HANDLE DELETE =====================
  async function handleDeleteOwner() {
    if (!selectedOwner.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this owner?",
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("owners")
        .delete()
        .eq("id", selectedOwner.id); // WHERE id = ?

      if (error) throw error;

      // Actualizamos estado local
      setOwners((prev) => prev.filter((o) => o.id !== selectedOwner.id));
      setSelectedOwner(emptyOwner);
      setIsEditing(false);
      setIsCreating(false);
    } catch (err) {
      console.error("Error deleting owner:", err);
    }
  }

  // Seleccionar fila
  function handleSelect(owner: Owner) {
    setSelectedOwner(owner);
    setIsEditing(false);
    setIsCreating(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen scale-90">
      <div className="bg-amber-100 border-20 border-amber-400 px-2 py-20 flex flex-col items-center justify-center gap-6 min-w-[400px]">
        {/* Top box */}
        <div className="flex flex-row items-center justify-center gap-6">
          <div className="flex flex-col gap-2 items-center">
            <FormOwners
              selectedOwner={selectedOwner}
              setSelectedOwner={setSelectedOwner}
              isEditing={isEditing}
              isCreating={isCreating}
            />
            <TableOwners owners={owners} handleSelect={handleSelect} />
          </div>
          <div className="flex flex-col items-center gap-6">
            <ButtonsOwners
              setIsEditing={setIsEditing}
              selectedOwner={selectedOwner}
              isCreating={isCreating}
              isEditing={isEditing}
              handleSave={handleSave}
              handleCancel={handleCancel}
              handleNew={handleNew}
              handleDeleteOwner={handleDeleteOwner}
              emptyOwner={emptyOwner}
            />
            <TablePets />
          </div>
        </div>

        {/* Bottom box */}
        <div className="flex flex-row gap-2 justify-center items-center mx-10">
          <TableVisits />
          <ButtonsVisits />
        </div>
      </div>
    </div>
  );
}
