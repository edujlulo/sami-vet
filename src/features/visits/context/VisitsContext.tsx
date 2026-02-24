import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { VisitWithRelations } from "../../../types/VisitWithRelations";

interface VisitsContextType {
  selectedVisit: VisitWithRelations | null;
  setSelectedVisit: Dispatch<SetStateAction<VisitWithRelations | null>>;
  emptyVisit: VisitWithRelations;
}

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export function VisitsProvider({ children }: { children: ReactNode }) {
  const emptyVisit: Omit<VisitWithRelations, "id"> = {
    petId: 0,
    ownerId: 0,
    invoiceNumber: "",
    visitDate: "",
    petName: "",
    ownerSurname: "",
    ownerName: "",
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

  const [selectedVisit, setSelectedVisit] = useState<VisitWithRelations | null>(
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
