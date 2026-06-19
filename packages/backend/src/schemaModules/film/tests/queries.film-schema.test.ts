import { GRAPHQL_PATH } from "~/config";
import { films } from "~/schemaModules/film/films.data";
import { createTestContext, type TestContext } from "~/tests/__helpers";

describe("film queries", () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestContext();
  });

  afterAll(async () => {
    await ctx.stopServer();
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
            languages
          }
        }
      `,
    };

    const response = await ctx.request.post(GRAPHQL_PATH).send(queryData);

    expect(response.status).toBe(200);
    expect(response.body.data.films).toHaveLength(films.length);
    expect(response.body.data.films[0].title).toBe(films[0].title);
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
