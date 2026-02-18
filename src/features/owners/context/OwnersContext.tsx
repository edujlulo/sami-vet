import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import type { Owner } from "../../../types/Owner";

interface OwnersContextType {
  selectedOwner: Owner;
  setSelectedOwner: Dispatch<SetStateAction<Owner>>;
  emptyOwner: Owner;
}

const OwnersContext = createContext<OwnersContextType | undefined>(undefined);

export function OwnersProvider({ children }: { children: ReactNode }) {
  const emptyOwner: Owner = {
    id: 0,
    surname: "",
    name: "",
    idCardNumber: "",
    rif: "",
    homePhone: "",
    mobilePhone: "",
    officePhone: "",
    email: "",
    address: "",
    estate: "",
    person: "",
    taxpayer: "",
    registered: "",
    affiliate: false,
  };

  const [selectedOwner, setSelectedOwner] = useState<Owner>(emptyOwner);

  return (
    <OwnersContext.Provider
      value={{ selectedOwner, setSelectedOwner, emptyOwner }}
    >
      {children}
    </OwnersContext.Provider>
  );
}

export function useOwnersContext() {
  const context = useContext(OwnersContext);
  if (!context)
    throw new Error("useOwnersContext must be used within an OwnersProvider");
  return context;
}
