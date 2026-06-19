import { GRAPHQL_PATH } from "~/config";
import prisma from "~/prisma-client";
import { createTestContext, type TestContext } from "~/tests/__helpers";
import { films } from "../../../../prisma/seed/films.data";

describe("film queries", () => {
  let ctx: TestContext;

  beforeAll(async () => {
    await prisma.film.deleteMany();
    await prisma.film.createMany({ data: films });
    ctx = await createTestContext();
  });

  afterAll(async () => {
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
