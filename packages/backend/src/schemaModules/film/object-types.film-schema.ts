import { builder } from "~/schema";

// Backed by the `Film` Prisma model. Every column is non-null, so the GraphQL
// fields are exposed as non-null (`nullable: false`) to match. The translatable
// fields (title, tagline, description, trivia) are resolved for the locale
// requested on the `films`/`film` query; see `localize.ts`.
builder.prismaObject("Film", {
  description:
    "A Studio Ghibli film, with copy localized to the requested locale.",
  fields: (t) => ({
    id: t.exposeID("id", { nullable: false }),
    title: t.exposeString("title", { nullable: false }),
    description: t.exposeString("description", { nullable: false }),
    tagline: t.exposeString("tagline", {
      nullable: false,
      description: "Short, one-line tagline.",
    }),
    trivia: t.exposeStringList("trivia", {
      nullable: false,
      description: "A few short pieces of trivia about the film.",
    }),
    director: t.exposeString("director", { nullable: false }),
    releaseDate: t.exposeString("releaseDate", {
      nullable: false,
      description: 'Release year, e.g. "2001".',
    }),
    runtime: t.exposeString("runtime", {
      nullable: false,
      description: 'Running time in minutes, e.g. "124".',
    }),
    image: t.exposeString("image", {
      nullable: false,
      description: "Poster image URL.",
    }),
    banner: t.exposeString("banner", {
      nullable: false,
      description: "Wide banner image URL.",
    }),
    score: t.exposeString("score", {
      nullable: false,
      description: 'Rotten Tomatoes score, e.g. "97".',
    }),
    languages: t.exposeStringList("languages", {
      nullable: false,
      description:
        'Locales this film is translated into; always includes "en".',
    }),
  }),
});
