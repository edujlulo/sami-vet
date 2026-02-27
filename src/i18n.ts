import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // carga traducciones desde archivos
  .use(LanguageDetector) // detecta el idioma del navegador
  .use(initReactI18next) // conecta con React
  .init({
    fallbackLng: "en", // si no encuentra traducción, usa inglés
    debug: true, // muestra logs en consola (solo desarrollo)
    interpolation: {
      escapeValue: false, // react ya se encarga de escapar
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // ruta a los archivos JSON
    },
  });

export default i18n;
