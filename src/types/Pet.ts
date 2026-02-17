export type Pet = {
  id: number; // primary key
  ownerId: number; // foreign key to Owner
  name: string;
  birthDate: string; // Fech Naci, en formato ISO (ej: '2026-02-17')
  species: string;
  breed: string;
  sex: string;
  pedigree: string;
  color: string;
  licensePlate?: string;
  chip?: string;
  registrationDate: string;
};
