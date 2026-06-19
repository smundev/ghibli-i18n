import { gql } from "@apollo/client";

export const GET_FILMS = gql`
  query GetFilms {
    films {
      id
      title
      description
      director
      releaseDate
      runtime
      image
      banner
      score
      languages
    }
  }
`;
