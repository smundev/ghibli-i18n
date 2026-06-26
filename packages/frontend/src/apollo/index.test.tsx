import { ApolloClient, ApolloLink, Observable } from "@apollo/client";
import { createCache } from "~/apollo";
import { GET_FILMS } from "~/graphql/films";

// A link that returns a different film title per requested locale, so we can
// prove one locale's copy never leaks into another via the cache.
const localeAwareLink = new ApolloLink((operation) =>
  Observable.of({
    data: {
      films: [
        {
          __typename: "Film",
          id: "film-1",
          title:
            operation.variables.locale === "fr"
              ? "Ponyo sur la falaise"
              : "Ponyo",
          description: "desc",
          tagline: "tag",
          trivia: [],
          director: "Hayao Miyazaki",
          releaseDate: "2008",
          runtime: "100",
          image: "image.jpg",
          banner: "banner.jpg",
          score: "92",
          languages: ["en", "fr"],
        },
      ],
    },
  })
);

describe("apollo cache locale handling", () => {
  it("keeps each locale's film copy separate (no stale text when switching back)", async () => {
    const client = new ApolloClient({
      link: localeAwareLink,
      cache: createCache(),
    });

    const en = await client.query({
      query: GET_FILMS,
      variables: { locale: "en" },
    });
    expect(en.data.films[0].title).toBe("Ponyo");

    const fr = await client.query({
      query: GET_FILMS,
      variables: { locale: "fr" },
    });
    expect(fr.data.films[0].title).toBe("Ponyo sur la falaise");

    // Switching back reads from cache; without keyFields:false this would
    // return the French title because both share the normalized id "film-1".
    const enAgain = await client.query({
      query: GET_FILMS,
      variables: { locale: "en" },
      fetchPolicy: "cache-first",
    });
    expect(enAgain.data.films[0].title).toBe("Ponyo");
  });
});
