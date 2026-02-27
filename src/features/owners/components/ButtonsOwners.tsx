import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import type { Owner } from "../../../types/Owner";

interface ButtonsOwnersProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOwner: Owner;
  isCreating: boolean;
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  handleNew: () => void;
  handleDeleteOwner: () => void;
  emptyOwner: Owner;
}

export default function ButtonsOwners({
  setIsEditing,
  selectedOwner,
  isCreating,
  isEditing,
  handleSave,
  handleCancel,
  handleNew,
  handleDeleteOwner,
  emptyOwner,
}: ButtonsOwnersProps) {
  const { t } = useTranslation("owners");

  return (
    <div className="bg-amber-200 py-2 px-2 mt-4">
      <p className="flex items-center justify-center text-blue-900 font-bold">
        {t("owner")}
      </p>
      <div className="flex flex-row gap-2 overflow-x-auto">
        {/* Columna 1 */}
        <div className="flex flex-col gap-2">
          <Button
            name={t("new")}
            onClick={handleNew}
            disabled={isEditing || isCreating}
            className="h-auto"
          />

          <Button
            name={t("save")}
            onClick={handleSave}
            disabled={!isEditing && !isCreating}
            className="h-auto"
          />
          <Button
            name={t("delete")}
            onClick={handleDeleteOwner}
            disabled={selectedOwner.id === 0 || isCreating}
            className="h-auto"
          />
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col gap-2">
          <Button
            name={t("edit")}
            onClick={() => setIsEditing(true)}
            disabled={selectedOwner.id === 0 || isCreating}
            className="h-auto"
          />
          <Button
            name={t("cancel")}
            onClick={handleCancel}
            disabled={
              !isEditing &&
              !isCreating &&
              JSON.stringify(selectedOwner) === JSON.stringify(emptyOwner)
            }
            className="h-auto"
          />

          <Button name={t("details")} disabled={true} className="h-auto" />
        </div>
      </div>
    </div>
  );
}
