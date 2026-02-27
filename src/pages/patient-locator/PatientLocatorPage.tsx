import { useState } from "react";
import PetHistoryPage from "./PetHistoryPage";
import OwnersPage from "./OwnersPage";
import { useOwnersContext } from "../../features/owners/context/OwnersContext";
import { usePets } from "../../features/pets/hooks/usePets";
import { usePetsByOwner } from "../../features/pets/hooks/usePetsByOwner";
import { useVisits } from "../../features/visits/hooks/useVisits";
import { useTranslation } from "react-i18next";
// import { usePetsByOwner } from "../../features/pets/hooks/usePetsByOwner";

export default function PatientLocatorPage() {
  const { t } = useTranslation("patient-locator-page");

  const [activeTab, setActiveTab] = useState("A"); // state for active tab

  const { selectedOwner } = useOwnersContext();
  const { refetch } = usePetsByOwner(selectedOwner.id);
  const { handleSelectPet } = usePets({ refetch });
  const { handleSelectVisit } = useVisits();

  return (
    <div className="min-h-screen flex items-center justify-start xl:justify-center overflow-auto">
      <div
        className="
    bg-amber-100
    border-[20px] border-amber-400
    px-2 py-8
    flex flex-col items-center
  
    w-[1400px]
  "
      >
        {/* --- Tabs --- */}

        {/* --- Header with tabs --- */}
        <div className="flex space-x-2">
          <button
            className={`
              px-68 py-2
              rounded-t-lg
              border
              border-b-0
              text-lg
              ${
                activeTab === "A"
                  ? "bg-amber-200 border-gray-300 font-semibold"
                  : "bg-amber-500 border-transparent hover:bg-amber-600"
              }
            `}
            onClick={() => setActiveTab("A")}
          >
            {t("owners")}
          </button>

          <button
            className={`
              px-56 py-2
              rounded-t-lg
              border
              border-b-0
            text-lg
              ${
                activeTab === "B"
                  ? "bg-amber-200 border-gray-300 font-semibold"
                  : "bg-amber-500 border-transparent hover:bg-amber-600"
              }
            `}
            onClick={() => setActiveTab("B")}
          >
            {t("petHistory")}
          </button>
        </div>

        {/* --- Tabs contein --- */}
        <div>
          {activeTab === "A" && (
            <OwnersPage
              handleSelectPet={handleSelectPet}
              handleSelectVisit={handleSelectVisit}
            />
          )}
          {activeTab === "B" && (
            <PetHistoryPage
              handleSelectPet={handleSelectPet}
              handleSelectVisit={handleSelectVisit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
