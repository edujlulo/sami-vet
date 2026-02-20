export interface Visit {
  id?: number;
  petId: number;
  invoiceNumber: string;
  visitDate: string;
  procedure: string;
  vet: string;
  h: string;
  ex: string;
  referredBy: string;
  totalAmount: number;
  weightKg: number | null;
  reasonForVisit: string;
  physicalExamination: string;
  diagnosis: string;
  notes: string;
  additionalTests: string;
  treatmentGiven: string;
  prescribedTreatment: string;
}
