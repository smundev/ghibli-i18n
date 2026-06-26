import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/** The locale the app falls back to. */
const DEFAULT_LOCALE = "en";

/** Locales that read right-to-left (only "ar" is in scope today). */
const RTL_LOCALES = new Set(["ar", "fa", "he", "ur"]);

const STORAGE_KEY = "ghibli-locale";

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

/** Locales we have site copy for, sorted (e.g. ["ar", "de", "en", …]). */
export const SUPPORTED_LOCALES = Object.keys(resources).sort();

export const isRtlLocale = (locale: string) => RTL_LOCALES.has(locale);

function readStoredLocale(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage may be unavailable (private mode, SSR); fall through.
    return null;
  }
}

/** Persists the chosen locale so it survives reloads. */
export function persistLocale(locale: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Non-fatal: the choice just won't survive a reload.
  }
}

/** Reflects the active locale on <html lang> and <html dir>. */
export function applyDocumentLocale(locale: string): void {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = isRtlLocale(locale) ? "rtl" : "ltr";
}

// Initial locale: a stored choice wins, then the browser's preference, then en.
function getInitialLocale(): string {
  const stored = readStoredLocale();
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    return stored;
  }
  const fromBrowser =
    typeof navigator === "undefined" ? "" : navigator.language.split("-")[0];
  if (SUPPORTED_LOCALES.includes(fromBrowser)) {
    return fromBrowser;
  }
  return DEFAULT_LOCALE;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLocale(),
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});
