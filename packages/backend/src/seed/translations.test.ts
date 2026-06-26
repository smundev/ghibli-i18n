import {
  loadFilmTranslations,
  parseFilmTranslation,
} from "~/seed/translations";

const SAMPLE = `---
lang: fr
film_id: 758bf02e-3122-46e0-884e-67cf83df1786
---

# Ponyo sur la falaise (French)

> **PLACEHOLDER — source material only.**

## Fields

- **title:** Ponyo sur la falaise
- **tagline:** Une princesse poisson rouge qui rêve de devenir humaine.
- **description:** Fils d'un marin, Sosuke, âgé de 5 ans, mène une vie paisible.
- **trivia:**
  - Librement inspiré de La Petite Sirène de Hans Christian Andersen.
  - Animé presque entièrement à la main.
  - Miyazaki a évité la plupart des images de synthèse.
`;

describe("parseFilmTranslation", () => {
  it("reads filmId and locale from frontmatter", () => {
    const result = parseFilmTranslation(SAMPLE);
    expect(result.filmId).toBe("758bf02e-3122-46e0-884e-67cf83df1786");
    expect(result.locale).toBe("fr");
  });

  it("reads the single-line fields", () => {
    const result = parseFilmTranslation(SAMPLE);
    expect(result.title).toBe("Ponyo sur la falaise");
    expect(result.tagline).toBe(
      "Une princesse poisson rouge qui rêve de devenir humaine."
    );
    expect(result.description).toContain("Fils d'un marin");
  });

  it("reads every trivia item as a list", () => {
    const result = parseFilmTranslation(SAMPLE);
    expect(result.trivia).toHaveLength(3);
    expect(result.trivia[0]).toBe(
      "Librement inspiré de La Petite Sirène de Hans Christian Andersen."
    );
    expect(result.trivia[2]).toBe(
      "Miyazaki a évité la plupart des images de synthèse."
    );
  });

  it("throws when a required field is missing", () => {
    const withoutTagline = SAMPLE.replace(
      "- **tagline:** Une princesse poisson rouge qui rêve de devenir humaine.\n",
      ""
    );
    expect(() => parseFilmTranslation(withoutTagline)).toThrow("tagline");
  });

  it("throws when frontmatter is missing", () => {
    expect(() => parseFilmTranslation("# Just a heading")).toThrow(
      "frontmatter"
    );
  });
});

describe("loadFilmTranslations", () => {
  it("loads the translation source files from disk", () => {
    const translations = loadFilmTranslations();
    expect(translations.length).toBeGreaterThan(0);

    // Every entry is fully populated.
    for (const t of translations) {
      expect(t.filmId).toBeTruthy();
      expect(t.locale).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.trivia.length).toBeGreaterThan(0);
    }

    // Porco Rosso is the English-only film in the source material.
    const porco = translations.filter(
      (t) => t.filmId === "ebbb6b7c-945c-41ee-a792-de0e43191bd8"
    );
    expect(porco.map((t) => t.locale)).toEqual(["en"]);
  });
});
