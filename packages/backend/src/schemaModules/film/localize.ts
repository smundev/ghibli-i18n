import type {
  FilmModel,
  FilmTranslationModel,
} from "~/generated/prisma/models";

/** The locale every film is guaranteed to have; used as the fallback. */
export const DEFAULT_LOCALE = "en";

type FilmWithTranslations = FilmModel & {
  translations: FilmTranslationModel[];
};

/**
 * Resolves a film's translatable fields (title, tagline, description, trivia)
 * for the requested locale. The fallback chain is: requested locale → English
 * translation → the film's base columns (only relevant if a film has no
 * translation rows at all). Locale-invariant fields pass through unchanged.
 *
 * This is the single place the fallback rule lives, so resolvers and the UI
 * never have to special-case a missing locale.
 */
export function localizeFilm(
  film: FilmWithTranslations,
  locale: string
): FilmModel {
  const { translations, ...base } = film;
  const match =
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === DEFAULT_LOCALE);

  if (!match) {
    return base;
  }

  return {
    ...base,
    title: match.title,
    tagline: match.tagline,
    description: match.description,
    trivia: match.trivia,
  };
}
