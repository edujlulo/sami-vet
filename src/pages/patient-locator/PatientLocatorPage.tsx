import { useOwners } from "../../features/owners/hooks/useOwners";

import { useState } from "react";
import PetHistoryPage from "./PetHistoryPage";
import OwnersPage from "./OwnersPage";

export default function PatientLocatorPage() {
  const {
    owners,
    selectedOwner,
    isEditing,
    isCreating,
    setSelectedOwner,
    setIsEditing,
    handleNew,
    handleCancel,
    handleSave,
    handleDeleteOwner,
    handleSelect,
    emptyOwner,
  } = useOwners();

  const [activeTab, setActiveTab] = useState("A"); // state for active tab

  return (
    <div className="flex flex-col items-center justify-center h-screen scale-75">
      <div className="bg-amber-100 border-20 border-amber-400 px-2 py-20 flex flex-col items-center justify-center gap-0 w-[1200px] h-[1150px]">
        {/* --- Tabs --- */}

        {/* --- Header with tabs --- */}
        <div className="flex space-x-2">
          <button
            className={`
              px-55 py-2
              rounded-t-lg
              border
              border-b-0
              text-xl
              ${activeTab === "A" ? "bg-amber-200 border-gray-300 font-semibold" : "bg-amber-500 border-transparent hover:bg-amber-600"}
            `}
            onClick={() => setActiveTab("A")}
          >
            Propietarios
          </button>

          <button
            className={`
              px-43 py-2
              rounded-t-lg
              border
              border-b-0
              text-xl
              ${activeTab === "B" ? "bg-amber-200 border-gray-300 font-semibold" : "bg-amber-500 border-transparent hover:bg-amber-600"}
            `}
            onClick={() => setActiveTab("B")}
          >
            Historia de las Mascotas
          </button>
        </div>

        {/* --- Tabs contein --- */}
        <div>
          {activeTab === "A" && (
            <OwnersPage
              owners={owners}
              selectedOwner={selectedOwner}
              isEditing={isEditing}
              isCreating={isCreating}
              setSelectedOwner={setSelectedOwner}
              setIsEditing={setIsEditing}
              handleNew={handleNew}
              handleCancel={handleCancel}
              handleSave={handleSave}
              handleDeleteOwner={handleDeleteOwner}
              handleSelect={handleSelect}
              emptyOwner={emptyOwner}
            />
          )}
          {activeTab === "B" && <PetHistoryPage />}
        </div>
      </div>
    </div>
  );
}
