import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/** The locale the app falls back to and starts in. */
export const DEFAULT_LOCALE = "en";

// Every catalog is bundled. The JSON is generated from the Markdown site copy
// under `/translations/site` by `pnpm i18n` — edit the Markdown, not the JSON.
const catalogs = import.meta.glob("./locales/*.json", {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>;

const localeOf = (filePath: string) => {
  const fileName = filePath.slice(filePath.lastIndexOf("/") + 1);
  return fileName.endsWith(".json")
    ? fileName.slice(0, -".json".length)
    : fileName;
};

const resources = Object.fromEntries(
  Object.entries(catalogs).map(([filePath, module]) => [
    localeOf(filePath),
    { translation: module.default },
  ])
);

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});
