import { useState } from "react";
import PetHistoryPage from "./PetHistoryPage";
import OwnersPage from "./OwnersPage";
import { OwnersProvider } from "../../features/owners/context/OwnersContext";
import { PetsProvider } from "../../features/pets/context/PetsContext";
// import { usePetsByOwner } from "../../features/pets/hooks/usePetsByOwner";

export default function PatientLocatorPage() {
  const [activeTab, setActiveTab] = useState("A"); // state for active tab

  // const { selectedOwner } = useOwners();

  // const { pets, loading, error } = usePetsByOwner(selectedOwner?.id ?? null);

  return (
    <OwnersProvider>
      <PetsProvider>
        <div className="flex flex-col items-center justify-center h-screen scale-75">
          <div className="bg-amber-100 border-20 border-amber-400 px-2 py-20 flex flex-col items-center justify-center gap-0 w-[1400px] h-[1150px]">
            {/* --- Tabs --- */}

            {/* --- Header with tabs --- */}
            <div className="flex space-x-2">
              <button
                className={`
              px-65 py-2
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
              px-54 py-2
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
              {activeTab === "A" && <OwnersPage />}
              {activeTab === "B" && <PetHistoryPage />}
            </div>
          </div>
        </div>
      </PetsProvider>
    </OwnersProvider>
  );
}
