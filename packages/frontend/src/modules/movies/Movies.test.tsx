import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GET_FILMS } from "~/graphql/films";
import Movies from "./Movies";

const filmsMock = {
  request: { query: GET_FILMS, variables: { locale: "en" } },
  result: {
    data: {
      films: [
        {
          id: "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
          title: "My Neighbor Totoro",
          description: "Two sisters discover forest spirits called Totoros.",
          tagline: "Two sisters meet the magical spirits of the forest.",
          trivia: ["Totoro is Studio Ghibli's mascot."],
          director: "Hayao Miyazaki",
          releaseDate: "1988",
          runtime: "86",
          image: "https://example.com/totoro.jpg",
          banner: "https://example.com/totoro-banner.jpg",
          score: "93",
          languages: ["en", "ja"],
        },
      ],
    },
  },
};

describe("Movies", () => {
  it("renders a film once the query resolves", async () => {
    render(
      <MockedProvider mocks={[filmsMock]}>
        <MemoryRouter>
          <Movies />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("My Neighbor Totoro")).toBeInTheDocument();
    expect(screen.getByText("Hayao Miyazaki")).toBeInTheDocument();
    expect(
      screen.getByText("Two sisters meet the magical spirits of the forest.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Totoro is Studio Ghibli's mascot.")
    ).toBeInTheDocument();
  });
});
