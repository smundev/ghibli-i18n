import type en from "./locales/en.json";

// Makes `t()` keys type-checked and autocompleted against the English catalog
// (the source-of-truth shape every locale shares).
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: typeof en };
  }
}
