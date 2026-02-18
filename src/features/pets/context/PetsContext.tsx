import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Pet } from "../../../types/Pet";

interface PetsContextType {
  selectedPet: Pet | null;
  setSelectedPet: Dispatch<SetStateAction<Pet | null>>;
  emptyPet: Pet;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const emptyPet: Pet = {
    id: 0,
    name: "",
    species: "",
    breed: "",
    sex: "",
    color: "",
    chip: "",
    licensePlate: "",
    pedigree: "",
    birthDate: "",
    registrationDate: "",
    ownerId: 0,
  };

  const [selectedPet, setSelectedPet] = useState<Pet | null>(emptyPet);

  return (
    <PetsContext.Provider value={{ selectedPet, setSelectedPet, emptyPet }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePetsContext() {
  const context = useContext(PetsContext);
  if (!context)
    throw new Error("usePetsContext must be used within a PetsProvider");
  return context;
}
