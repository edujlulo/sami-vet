export interface VisitEntity {
  id?: number;
  petId: number;
  invoiceNumber: string | null;
  visitDate: string | null;
  procedure: string | null;
  vet: string | null;
  h: string | null;
  ex: string | null;
  referredBy: string | null;
  totalAmount: string | null;
  weightKg: string | null;
  reasonForVisit: string | null;
  physicalExamination: string | null;
  diagnosis: string | null;
  notes: string | null;
  additionalTests: string | null;
  treatmentGiven: string | null;
  prescribedTreatment: string | null;
}
