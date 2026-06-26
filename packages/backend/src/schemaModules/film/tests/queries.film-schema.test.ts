import { GRAPHQL_PATH } from "~/config";
import prisma from "~/prisma-client";
import { loadFilmTranslations } from "~/seed/translations";
import { createTestContext, type TestContext } from "~/tests/__helpers";
import { films } from "../../../../prisma/seed/films.data";

// Ponyo has a French translation; Porco Rosso is English-only.
const PONYO_ID = "758bf02e-3122-46e0-884e-67cf83df1786";
const PORCO_ID = "ebbb6b7c-945c-41ee-a792-de0e43191bd8";

describe("film queries", () => {
  let ctx: TestContext;

  beforeAll(async () => {
    await prisma.film.deleteMany();
    await prisma.film.createMany({ data: films });
    await prisma.filmTranslation.createMany({ data: loadFilmTranslations() });
    ctx = await createTestContext();
  });

  afterAll(async () => {
    // Deleting films cascades to their translations.
    await prisma.film.deleteMany();
    await ctx.stopServer();
    await prisma.$disconnect();
  });

  it("should return every seeded film", async () => {
    const queryData = {
      query: `
        query Films {
          films {
            id
            title
            director
            releaseDate
            runtime
            score
            image
            banner
            tagline
            trivia
            languages
          }
        }
      `,
    };

    const response = await ctx.request.post(GRAPHQL_PATH).send(queryData);

    expect(response.status).toBe(200);
    expect(response.body.data.films).toHaveLength(films.length);
    const titles = response.body.data.films.map(
      (film: { title: string }) => film.title
    );
    expect(titles).toEqual(expect.arrayContaining(films.map((f) => f.title)));
  });

  it("should return a single film by id", async () => {
    const [target] = films;
    const queryData = {
      query: `
        query Film($id: ID!) {
          film(id: $id) {
            id
            title
            languages
          }
        }
      `,
      variables: { id: target.id },
    };

    const response = await ctx.request.post(GRAPHQL_PATH).send(queryData);

    expect(response.status).toBe(200);
    expect(response.body.data.film.title).toBe(target.title);
    expect(response.body.data.film.languages).toEqual(target.languages);
  });

  it("returns film copy in the requested locale", async () => {
    const queryData = {
      query: `
        query Film($id: ID!, $locale: String) {
          film(id: $id, locale: $locale) {
            title
            tagline
          }
        }
      `,
      variables: { id: PONYO_ID, locale: "fr" },
    };

    const response = await ctx.request.post(GRAPHQL_PATH).send(queryData);

    expect(response.status).toBe(200);
    expect(response.body.data.film.title).toBe("Ponyo sur la falaise");
    // French copy, not the English "A goldfish princess who longs to be human."
    expect(response.body.data.film.tagline).toContain("poisson rouge");
  });

  it("falls back to English when the film lacks the requested locale", async () => {
    const queryData = {
      query: `
        query Film($id: ID!, $locale: String) {
          film(id: $id, locale: $locale) {
            title
          }
        }
      `,
      // Porco Rosso has no German translation.
      variables: { id: PORCO_ID, locale: "de" },
    };

    const response = await ctx.request.post(GRAPHQL_PATH).send(queryData);

    expect(response.status).toBe(200);
    expect(response.body.data.film.title).toBe("Porco Rosso");
  });

  it("should return null for an unknown film id", async () => {
    const queryData = {
      query: `
        query Film($id: ID!) {
          film(id: $id) {
            id
          }
        }
      `,
      variables: { id: "does-not-exist" },
    };

    const response = await ctx.request.post(GRAPHQL_PATH).send(queryData);

    expect(response.status).toBe(200);
    expect(response.body.data.film).toBeNull();
  });
});
