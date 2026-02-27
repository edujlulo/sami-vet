import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div>
      <div className="absolute top-5 right-5 flex gap-2">
        <button
          onClick={() => i18n.changeLanguage("en")}
          className="bg-amber-100 cursor-pointer flex items-center gap-1 px-3 py-1 rounded-md border border-gray-400 hover:bg-amber-200 transition"
        >
          <span role="img" aria-label="UK Flag">
            <img
              src="https://flagcdn.com/gb.svg"
              alt="United Kingdom"
              width={30}
              height={18}
            />
          </span>
          English
        </button>
        <button
          onClick={() => i18n.changeLanguage("es")}
          className="bg-amber-100 cursor-pointer flex items-center gap-1 px-3 py-1 rounded-md border border-gray-400 hover:bg-amber-200 transition"
        >
          <span role="img" aria-label="Spain Flag">
            <img
              src="https://flagcdn.com/es.svg"
              alt="United Kingdom"
              width={30}
              height={18}
            />
          </span>
          Español
        </button>
      </div>
    </div>
  );
}
