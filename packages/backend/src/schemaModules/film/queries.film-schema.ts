import { getRequestLogger } from "~/loggers";
import { builder } from "~/schema";
import { DEFAULT_LOCALE, localizeFilm } from "./localize";

// Only the requested locale and English need loading: English is the fallback,
// so those two rows are enough to resolve every translatable field.
const translationsFor = (locale: string) => ({
  translations: {
    where: { locale: { in: [locale, DEFAULT_LOCALE] } },
  },
});

builder.queryField("films", (t) =>
  t.prismaField({
    type: ["Film"],
    nullable: false,
    description: "List all Studio Ghibli films.",
    args: {
      locale: t.arg.string({
        required: false,
        defaultValue: DEFAULT_LOCALE,
        description:
          "Locale to return film copy in. Falls back to English when a film has no translation for it.",
      }),
    },
    resolve: async (_query, _root, { locale }, { prisma }) => {
      const lang = locale ?? DEFAULT_LOCALE;
      getRequestLogger().info({ locale: lang }, "Fetching all films");

      const films = await prisma.film.findMany({
        orderBy: { title: "asc" },
        include: translationsFor(lang),
      });

      return films
        .map((film) => localizeFilm(film, lang))
        .sort((a, b) => a.title.localeCompare(b.title, lang));
    },
  })
);

builder.queryField("film", (t) =>
  t.prismaField({
    type: "Film",
    nullable: true,
    description: "Fetch a single Studio Ghibli film by id.",
    args: {
      id: t.arg.id({ required: true }),
      locale: t.arg.string({
        required: false,
        defaultValue: DEFAULT_LOCALE,
        description:
          "Locale to return film copy in. Falls back to English when the film has no translation for it.",
      }),
    },
    resolve: async (_query, _root, { id, locale }, { prisma }) => {
      const lang = locale ?? DEFAULT_LOCALE;
      getRequestLogger().info({ id, locale: lang }, "Fetching film by id");

      const film = await prisma.film.findUnique({
        where: { id: String(id) },
        include: translationsFor(lang),
      });

      return film ? localizeFilm(film, lang) : null;
    },
  })
);
