import { Button, styled, Typography } from "@mui/material";
import { useGetFilmsQuery } from "~/graphql/gen/graphql";
import { FilmCard, FilmCardSkeleton } from "./components/FilmCard";
import { MoviesHeader } from "./components/MoviesHeader";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

const Movies = () => {
  const { loading, error, data, refetch } = useGetFilmsQuery();

  if (loading) {
    return (
      <Page>
        <MoviesHeader />
        <MoviesGrid>
          {SKELETON_KEYS.map((key) => (
            <FilmCardSkeleton key={key} />
          ))}
        </MoviesGrid>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <MoviesHeader />
        <ErrorPanel>
          <Typography variant="body1">We couldn't load the films.</Typography>
          <Typography color="text.secondary" variant="body2">
            {error.message}
          </Typography>
          <Button onClick={() => refetch()} variant="contained">
            Try again
          </Button>
        </ErrorPanel>
      </Page>
    );
  }

  const films = data?.films ?? [];

  return (
    <Page>
      <MoviesHeader />
      <MoviesGrid>
        {films.map((film) => (
          <FilmCard film={film} key={film.id} />
        ))}
      </MoviesGrid>
    </Page>
  );
};

const Page = styled("div")(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(5, 4),
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(3, 2) },
}));

const MoviesGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
  gap: theme.spacing(3),
}));

const ErrorPanel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  background: theme.palette.background.paper,
  border: "1px solid rgba(91, 138, 82, 0.18)",
  borderRadius: 18,
  padding: theme.spacing(4),
}));

export default Movies;
