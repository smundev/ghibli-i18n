/**
 * Formats a number (or numeric string from the API) for a locale, applying
 * locale-correct grouping, signs, and digit system (per CLDR — e.g. some
 * locales render non-Latin digits). Returns the raw value unchanged if it
 * isn't numeric, so non-numeric copy is never mangled.
 */
export function formatNumber(
  value: string | number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numeric)) {
    return String(value);
  }
  return new Intl.NumberFormat(locale, options).format(numeric);
}
