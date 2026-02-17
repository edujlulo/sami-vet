import type { Dispatch, SetStateAction } from "react";
import type { Owner } from "./Owner";

export type OwnersPageProps = {
  owners: Owner[];
  selectedOwner: Owner;
  isEditing: boolean;
  isCreating: boolean;
  setSelectedOwner: Dispatch<SetStateAction<Owner>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleNew: () => void;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
  handleDeleteOwner: () => Promise<void>;
  handleSelect: (owner: Owner) => void;
  emptyOwner: Owner;
};
