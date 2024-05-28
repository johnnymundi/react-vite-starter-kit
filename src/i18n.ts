// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locale/en-US.json";
import ptTranslations from "./locale/pt-BR.json";

i18n
  .use(initReactI18next) // Inicializa o react-i18next
  .init({
    resources: {
      en: {
        ...enTranslations,
      },
      pt: {
        ...ptTranslations,
      },
    },
    fallbackLng: "en", // Língua padrão
    debug: true, // Ativa o modo de depuração
    interpolation: {
      escapeValue: false, // React já protege contra XSS
    },
  });

export default i18n;
