import { useTranslation } from "react-i18next";

export default function TablePetVaccines() {
  const { t } = useTranslation("pets");

  const emptyRows = 9;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center">
        <p className=" text-red-800 font-bold w-50">
          {t("vaccinesHistoryTitle")}
        </p>
        <button
          className={`
        bg-amber-50
        border border-gray-300
        rounded-md
        py-1
        px-2
        cursor-pointer
        shadow-sm
        hover:bg-green-50
        hover:border-green-300
        hover:shadow-md
        transform
        hover:-translate-y-px
        active:translate-y-0
        transition-all duration-150
        w-20
        h-9
       text-blue-900
       font-bold
        disabled:text-gray-400
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-200
      `}
        >
          {t("remove")}
        </button>
      </div>
      <div className="w-[320px] h-[205px] overflow-y-auto border border-gray-900">
        <table className="bg-amber-50 border border-gray-900 w-full table-fixed bg-amber-50 text-ellipsis">
          <thead>
            <tr>
              <th className="w-[20%] border border-gray-900 px-2 py-0.5">
                {t("date")}
              </th>
              <th className="w-[40%] border border-gray-900 px-2 py-0.5">
                {t("vaccine")}
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map(
              (_, i) => (
                <tr key={`empty-${i}`}>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                  <td className="border border-gray-900 px-2 py-0.5">&nbsp;</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
