import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { applyDocumentLocale, persistLocale, SUPPORTED_LOCALES } from "~/i18n";

interface LocaleContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  supportedLocales: string[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Owns the active locale: keeps i18next, <html lang>/<dir>, and localStorage in
 * sync. Read-only consumers can also just use react-i18next's `i18n.language`;
 * this provider is for components that *change* the locale (the picker) and for
 * driving document direction.
 */
export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [locale, setLocaleState] = useState(i18n.language);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback(
    (next: string) => {
      i18n.changeLanguage(next).catch(() => {
        // Catalogs are bundled, so this effectively never rejects; ignore.
      });
      persistLocale(next);
      setLocaleState(next);
    },
    [i18n]
  );

  const value = useMemo(
    () => ({ locale, supportedLocales: SUPPORTED_LOCALES, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
