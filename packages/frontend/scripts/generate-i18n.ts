import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Generates the frontend's i18n message catalogs from the Markdown site copy
 * under `/translations/site`. Each `<lang>.md` describes strings by *where they
 * appear* (a human label), not by a key — so this script maps those stable
 * English labels to stable dot-keys and emits one `src/i18n/locales/<lang>.json`
 * per language. The Markdown is the source of truth; the JSON is generated.
 *
 * Run with `pnpm i18n` after editing the source copy.
 */

// Maps the (English, stable) label used in the Markdown to the key the app uses.
// Order here also defines the order of keys in the generated JSON.
const LABEL_TO_KEY: Record<string, string> = {
  // Welcome page
  "Studio name (heading)": "welcome.studioName",
  "Hero headline": "welcome.heroHeadline",
  "Overview paragraph": "welcome.overview",
  "Secondary line under the overview": "welcome.overviewSecondary",
  "Button that opens the movies list": "welcome.viewMovies",
  // Movies page
  "Page heading": "movies.heading",
  "Page subtitle": "movies.subtitle",
  "Link back to the welcome page": "movies.backToWelcome",
  "Error message when films fail to load": "movies.loadError",
  "Retry button": "movies.retry",
  // Film detail labels
  Director: "film.director",
  "Release date": "film.releaseDate",
  Runtime: "film.runtime",
  "Runtime unit (shown after a number, e.g. 124 min)": "film.runtimeUnit",
  "Review score source": "film.scoreSource",
  "Trivia section": "film.trivia",
  // Fallback pages
  "Not-found page — back-home button": "notFound.backHome",
  "Error page — heading": "error.heading",
  "Error page — message": "error.message",
  "Error page — unknown-error fallback": "error.unknown",
  // Application
  "Application name": "app.name",
  "Page description (search engines / sharing)": "app.description",
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(scriptDir, "../../../translations/site");
const outDir = path.resolve(scriptDir, "../src/i18n/locales");

/** Reads `- <label>: <value>` bullets from a site Markdown file. */
function readLabels(content: string): Map<string, string> {
  const labels = new Map<string, string>();
  for (const line of content.split("\n")) {
    if (!line.startsWith("- ")) {
      continue;
    }
    const separator = line.indexOf(": ");
    if (separator === -1) {
      continue;
    }
    const label = line.slice(2, separator).trim();
    labels.set(label, line.slice(separator + 2).trim());
  }
  return labels;
}

/** Turns a flat `{ "a.b": value }` map into a nested object. */
function nest(flat: Record<string, string>): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  for (const [dottedKey, value] of Object.entries(flat)) {
    const parts = dottedKey.split(".");
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      node[parts[i]] ??= {};
      node = node[parts[i]] as Record<string, unknown>;
    }
    node[parts.at(-1) as string] = value;
  }
  return root;
}

function generate(): void {
  mkdirSync(outDir, { recursive: true });

  const files = readdirSync(siteDir).filter((file) => file.endsWith(".md"));
  for (const file of files) {
    const locale = path.basename(file, ".md");
    const labels = readLabels(readFileSync(path.join(siteDir, file), "utf8"));

    const flat: Record<string, string> = {};
    for (const [label, key] of Object.entries(LABEL_TO_KEY)) {
      const value = labels.get(label);
      if (value === undefined) {
        throw new Error(`[${file}] missing label: "${label}"`);
      }
      flat[key] = value;
    }

    const outPath = path.join(outDir, `${locale}.json`);
    writeFileSync(outPath, `${JSON.stringify(nest(flat), null, 2)}\n`);
  }

  console.log(`Generated ${files.length} locale catalogs in ${outDir}`);
}

generate();
