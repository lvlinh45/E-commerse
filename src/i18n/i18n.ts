import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOMEPAGE__EN from "../locales/en/homePage.json";
import HOMEPAGE__VI from "../locales/vi/homePage.json";

const resources = {
  en: {
    homePage: HOMEPAGE__EN,
  },
  vi: {
    homePage: HOMEPAGE__VI,
  },
};

const defaultNS = "homePage";

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lng") || "en",
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lng", lng);
});

export default i18n;
