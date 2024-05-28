// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Inicializa o react-i18next
  .init({
    fallbackLng: "en", // Língua padrão
    debug: true, // Ativa o modo de depuração
    interpolation: {
      escapeValue: false, // React já protege contra XSS
    },
  });

export default i18n;
