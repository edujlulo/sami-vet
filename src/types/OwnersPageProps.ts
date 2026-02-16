import type { Owner } from "./Owner";

export type OwnersPageProps = {
  owners: Owner[];
  selectedOwner: Owner;
  isEditing: boolean;
  isCreating: boolean;
  setSelectedOwner: (owner: Owner) => void;
  setIsEditing: (value: boolean) => void;
  handleNew: () => void;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
  handleDeleteOwner: () => Promise<void>;
  handleSelect: (owner: Owner) => void;
  emptyOwner: Owner;
};
