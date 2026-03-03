import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import i18n from "./i18n";

import { I18nextProvider } from "react-i18next";

// 🔥 IMPORTANTE: sincronizar lang con i18next
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

// también setearlo al cargar por primera vez
document.documentElement.lang = i18n.language;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
);
