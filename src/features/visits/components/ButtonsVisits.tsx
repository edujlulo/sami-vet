import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

interface Props {
  handleNewVisit: () => void;
  handleEditVisit: () => void;
}

export default function ButtonsVisits({
  handleNewVisit,
  handleEditVisit,
}: Props) {
  const { t } = useTranslation("visits");
  const navigate = useNavigate();

  return (
    <div>
      <p className="flex items-center justify-center text-blue-900 font-bold">
        {t("visits")}
      </p>

      <div className="flex flex-row gap-2 overflow-x-auto bg-amber-200 py-4 px-2">
        {/* Columna 1 */}
        <div className="flex flex-col gap-1">
          <Button name={t("add")} onClick={handleNewVisit} className="h-auto" />
          <Button name={t("abort")} className="h-auto" />
          <Button name={t("till")} className="h-auto" />
          <Button name={t("estimates")} className="h-auto" />
          <Button name={t("pending")} className="h-auto" />
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col gap-1">
          <Button
            name={t("edit")}
            onClick={handleEditVisit}
            className="h-auto"
          />
          <Button name={t("invoice")} className="h-auto" />
          <Button name={t("details")} className="h-auto" />
          <Button name={t("reports")} className="h-auto" />
          <Button
            name={t("exit")}
            className="h-auto text-red-900"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
}
