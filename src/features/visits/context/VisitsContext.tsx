import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { VisitEntity } from "../../../types/VisitEntity";

interface VisitsContextType {
  selectedVisit: VisitEntity | null;
  setSelectedVisit: Dispatch<SetStateAction<VisitEntity | null>>;
  emptyVisit: VisitEntity;
}

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export function VisitsProvider({ children }: { children: ReactNode }) {
  const emptyVisit: Omit<VisitEntity, "id"> = {
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

  const [selectedVisit, setSelectedVisit] = useState<VisitEntity | null>(
    emptyVisit,
  );

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
