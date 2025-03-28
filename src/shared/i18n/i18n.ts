import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOMEPAGE__EN from "../locales/en/homePage.json";
import HOMEPAGE__VI from "../locales/vi/homePage.json";
import CARTPAGE__EN from "../locales/en/cartPage.json";
import CARTPAGE__VI from "../locales/vi/cartPage.json";
import CHECKOUTPAGE__EN from "../locales/en/checkoutPage.json";
import CHECKOUTPAGE__VI from "../locales/vi/checkoutPage.json";
import DETAILPAGE__EN from "../locales/en/detailPage.json";
import DETAILPAGE__VI from "../locales/vi/detailPage.json";
import SEEKINGPAGE__EN from "../locales/en/seekingPage.json";
import SEEKINGPAGE__VI from "../locales/vi/seekingPage.json";
import NOTFOUNDPAGE__EN from "../locales/en/notFoundPage.json";
import NOTFOUNDPAGE__VI from "../locales/vi/notFoundPage.json";
import LOGINPAGE__EN from "../locales/en/loginPage.json";
import LOGINPAGE__VI from "../locales/vi/loginPage.json";

const resources = {
  en: {
    homePage: HOMEPAGE__EN,
    cartPage: CARTPAGE__EN,
    checkoutPage: CHECKOUTPAGE__EN,
    detailPage: DETAILPAGE__EN,
    seekingPage: SEEKINGPAGE__EN,
    notFoundPage: NOTFOUNDPAGE__EN,
    loginPage: LOGINPAGE__EN,
  },
  vi: {
    homePage: HOMEPAGE__VI,
    cartPage: CARTPAGE__VI,
    checkoutPage: CHECKOUTPAGE__VI,
    detailPage: DETAILPAGE__VI,
    seekingPage: SEEKINGPAGE__VI,
    notFoundPage: NOTFOUNDPAGE__VI,
    loginPage: LOGINPAGE__VI,
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
