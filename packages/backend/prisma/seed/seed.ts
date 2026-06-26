import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "~/generated/prisma/client";
import { loadFilmTranslations } from "~/seed/translations";
import { films } from "./films.data";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const film of films) {
    await prisma.film.upsert({
      where: { id: film.id },
      update: film,
      create: film,
    });
  }

  const translations = loadFilmTranslations();

  // Track which locales each film actually has copy for, so `languages` is
  // derived from the data rather than hand-maintained — the picker can never
  // offer a locale we don't have.
  const localesByFilm = new Map<string, Set<string>>();

  for (const translation of translations) {
    const { filmId, locale, ...fields } = translation;
    await prisma.filmTranslation.upsert({
      where: { filmId_locale: { filmId, locale } },
      update: fields,
      create: { filmId, locale, ...fields },
    });

    const locales = localesByFilm.get(filmId) ?? new Set<string>();
    locales.add(locale);
    localesByFilm.set(filmId, locales);
  }

  for (const [filmId, locales] of localesByFilm) {
    await prisma.film.update({
      where: { id: filmId },
      data: { languages: [...locales].sort() },
    });
  }

  console.log(
    `Seeded ${films.length} films and ${translations.length} translations`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
