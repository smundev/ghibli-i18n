import type {
  FilmModel,
  FilmTranslationModel,
} from "~/generated/prisma/models";
import { localizeFilm } from "./localize";

const baseFilm: FilmModel = {
  id: "film-1",
  title: "Ponyo",
  description: "English description.",
  tagline: "English tagline.",
  director: "Hayao Miyazaki",
  releaseDate: "2008",
  runtime: "100",
  image: "image.jpg",
  banner: "banner.jpg",
  score: "92",
  trivia: ["English trivia."],
  languages: ["en", "fr"],
};

function translation(
  locale: string,
  overrides: Partial<FilmTranslationModel> = {}
): FilmTranslationModel {
  return {
    filmId: "film-1",
    locale,
    title: `title-${locale}`,
    tagline: `tagline-${locale}`,
    description: `description-${locale}`,
    trivia: [`trivia-${locale}`],
    ...overrides,
  };
}

describe("localizeFilm", () => {
  it("uses the requested locale when it exists", () => {
    const result = localizeFilm(
      { ...baseFilm, translations: [translation("en"), translation("fr")] },
      "fr"
    );
    expect(result.title).toBe("title-fr");
    expect(result.tagline).toBe("tagline-fr");
    expect(result.description).toBe("description-fr");
    expect(result.trivia).toEqual(["trivia-fr"]);
  });

  it("falls back to English when the requested locale is missing", () => {
    const result = localizeFilm(
      { ...baseFilm, translations: [translation("en")] },
      "de"
    );
    expect(result.title).toBe("title-en");
  });

  it("falls back to base columns when there are no translation rows", () => {
    const result = localizeFilm({ ...baseFilm, translations: [] }, "fr");
    expect(result.title).toBe("Ponyo");
    expect(result.tagline).toBe("English tagline.");
  });

  it("passes locale-invariant fields through unchanged", () => {
    const result = localizeFilm(
      { ...baseFilm, translations: [translation("fr")] },
      "fr"
    );
    expect(result.id).toBe("film-1");
    expect(result.director).toBe("Hayao Miyazaki");
    expect(result.score).toBe("92");
    expect(result.image).toBe("image.jpg");
    expect(result.languages).toEqual(["en", "fr"]);
  });
});
