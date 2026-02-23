import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Visit } from "../../../types/Visit";

interface VisitsContextType {
  selectedVisit: Visit | null;
  setSelectedVisit: Dispatch<SetStateAction<Visit | null>>;
  emptyVisit: Visit;
}

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export function VisitsProvider({ children }: { children: ReactNode }) {
  const emptyVisit: Omit<Visit, "id"> = {
    petId: 0,
    invoiceNumber: "",
    visitDate: "",
    procedure: "",
    vet: "",
    h: "",
    ex: "",
    referredBy: "",
    totalAmount: "",
    weightKg: "",
    reasonForVisit: "",
    physicalExamination: "",
    diagnosis: "",
    notes: "",
    additionalTests: "",
    treatmentGiven: "",
    prescribedTreatment: "",
  };

  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(emptyVisit);

  return (
    <VisitsContext.Provider
      value={{ selectedVisit, setSelectedVisit, emptyVisit }}
    >
      {children}
    </VisitsContext.Provider>
  );
}

export function useVisitsContext() {
  const context = useContext(VisitsContext);
  if (!context)
    throw new Error("useVisitsContext must be used within a VisitsProvider");
  return context;
}
