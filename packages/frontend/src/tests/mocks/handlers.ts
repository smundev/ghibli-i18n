import { graphql, HttpResponse } from "msw";

const mockFilms = [
  {
    id: "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
    title: "My Neighbor Totoro",
    description:
      "Two sisters move to the country and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest.",
    director: "Hayao Miyazaki",
    releaseDate: "1988",
    runtime: "86",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/totoro.jpg",
    banner: "https://image.tmdb.org/t/p/original/totoro-banner.jpg",
    score: "93",
    languages: ["en", "ja", "fr", "de", "es", "ko", "zh", "it"],
  },
];

export const handlers = [
  graphql.query("GetFilms", () =>
    HttpResponse.json({
      data: {
        films: mockFilms,
      },
    })
  ),
];
