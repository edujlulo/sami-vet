export interface VisitEntity {
  id?: number;
  petId: number;
  invoiceNumber: string;
  visitDate: string;
  procedure: string;
  vet: string;
  h: string;
  ex: string;
  referredBy: string;
  totalAmount: string;
  weightKg: string;
  reasonForVisit: string;
  physicalExamination: string;
  diagnosis: string;
  notes: string;
  additionalTests: string;
  treatmentGiven: string;
  prescribedTreatment: string;
}
