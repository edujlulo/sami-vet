import Button from "../../../components/Button";
import type { Pet } from "../../../types/Pet";
import { useTranslation } from "react-i18next";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  handleSave: () => void;
  handleNew: () => void;
  handleDeletePet: () => void;
  isEditing: boolean;
  isCreating: boolean;
  selectedPet: Pet | null;
  emptyPet: Pet;
}

export default function ButtonsPetHistory({
  setIsEditing,
  handleCancel,
  handleSave,
  handleNew,
  handleDeletePet,
  isEditing,
  isCreating,
  selectedPet,
  emptyPet,
}: Props) {
  const { t } = useTranslation("pets");

  return (
    <div className="bg-amber-200 py-2 px-2 mt-4">
      <div className="flex flex-col gap-1 overflow-x-auto">
        {/* Row 1 */}
        <div className="flex flex-row gap-1">
          <Button
            name={t("new")}
            onClick={handleNew}
            disabled={isEditing || isCreating}
            className="h-auto"
          />
          <Button
            name={t("edit")}
            onClick={() => setIsEditing(true)}
            disabled={
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet) ||
              isCreating
            }
            className="h-auto"
          />
          <Button
            name={t("save")}
            onClick={handleSave}
            disabled={!isEditing && !isCreating}
            className="h-auto"
          />
          <Button
            name={t("cancel")}
            onClick={handleCancel}
            disabled={
              !isEditing &&
              !isCreating &&
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet)
            }
            className="h-auto"
          />
          <Button
            name={t("delete")}
            onClick={handleDeletePet}
            disabled={
              JSON.stringify(selectedPet) === JSON.stringify(emptyPet) ||
              isCreating
            }
            className="h-auto"
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-row gap-1">
          <Button name={t("tests")} className="h-auto" />
          <Button name={t("treatment")} className="h-auto" />
          <Button name={t("certificate")} className="h-auto" />
          <Button name={t("statistics")} className="h-auto" />
          <Button name={t("report")} className="h-auto" />
        </div>
      </div>
    </div>
  );
}
