import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Parses the Markdown translation source under `/translations/films` into rows
 * for the `film_translation` table. The files are the source of truth — they are
 * parsed at seed time rather than hand-copied into the database.
 *
 * Each file has the shape:
 *
 *   ---
 *   lang: fr
 *   film_id: 758bf02e-...
 *   ---
 *   ## Fields
 *   - **title:** ...
 *   - **tagline:** ...
 *   - **description:** ...
 *   - **trivia:**
 *     - ...
 *     - ...
 */

export interface FilmTranslation {
  description: string;
  filmId: string;
  locale: string;
  tagline: string;
  title: string;
  trivia: string[];
}

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---/;
const TRIVIA_HEADING_RE = /^- \*\*trivia:\*\*/;
const TRIVIA_ITEM_RE = /^\s+- (.*)$/;

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error("Translation file is missing frontmatter");
  }

  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      continue;
    }
    const key = line.slice(0, separator).trim();
    fields[key] = line.slice(separator + 1).trim();
  }
  return fields;
}

function parseField(content: string, field: string): string {
  const prefix = `- **${field}:**`;
  const line = content.split("\n").find((l) => l.startsWith(prefix));
  if (!line) {
    throw new Error(`Translation file is missing field "${field}"`);
  }
  return line.slice(prefix.length).trim();
}

function parseTrivia(content: string): string[] {
  const lines = content.split("\n");
  const start = lines.findIndex((line) => TRIVIA_HEADING_RE.test(line));
  if (start === -1) {
    throw new Error('Translation file is missing field "trivia"');
  }

  const trivia: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const item = lines[i].match(TRIVIA_ITEM_RE);
    if (item) {
      trivia.push(item[1].trim());
    } else if (lines[i].trim() !== "") {
      // A non-indented, non-blank line means the trivia list has ended.
      break;
    }
  }
  return trivia;
}

export function parseFilmTranslation(content: string): FilmTranslation {
  const frontmatter = parseFrontmatter(content);
  const filmId = frontmatter.film_id;
  const locale = frontmatter.lang;
  if (!filmId) {
    throw new Error("Translation file is missing film_id in frontmatter");
  }
  if (!locale) {
    throw new Error("Translation file is missing lang in frontmatter");
  }

  return {
    filmId,
    locale,
    title: parseField(content, "title"),
    tagline: parseField(content, "tagline"),
    description: parseField(content, "description"),
    trivia: parseTrivia(content),
  };
}

const DEFAULT_TRANSLATIONS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../translations/films"
);

/**
 * Reads and parses every `films/<slug>/<lang>.md` file. Returns one entry per
 * file; the caller groups them by film and locale.
 */
export function loadFilmTranslations(
  filmsDir: string = DEFAULT_TRANSLATIONS_DIR
): FilmTranslation[] {
  const translations: FilmTranslation[] = [];

  for (const filmEntry of readdirSync(filmsDir, { withFileTypes: true })) {
    if (!filmEntry.isDirectory()) {
      continue;
    }
    const filmDir = path.join(filmsDir, filmEntry.name);
    for (const file of readdirSync(filmDir)) {
      if (!file.endsWith(".md")) {
        continue;
      }
      const content = readFileSync(path.join(filmDir, file), "utf8");
      translations.push(parseFilmTranslation(content));
    }
  }

  return translations;
}
