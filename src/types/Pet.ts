export type Pet = {
  id?: number; // primary key
  ownerId: number; // foreign key to Owner
  name: string;
  birthDate: string | null;
  species: string;
  breed: string;
  sex: string;
  pedigree: string;
  color: string;
  licensePlate?: string;
  chip?: string;
  registrationDate: string | null;
};
