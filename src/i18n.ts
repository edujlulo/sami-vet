import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    debug: false, // 🔥 quitamos logs de consola

    ns: [
      "login-page",
      "main-menu-page",
      "patient-locator-page",
      "owners",
      "pets",
      "billing",
      "visits",
    ],

    defaultNS: "login-page", // cualquiera puede ser default

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
