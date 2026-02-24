export interface VisitWithRelations {
  id?: number;
  petId: number;
  ownerId: number;
  invoiceNumber: string;
  visitDate: string;
  petName: string;
  ownerSurname: string;
  ownerName: string;
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
