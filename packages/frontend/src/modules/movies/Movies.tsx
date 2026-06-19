import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { type GetFilmsQuery, useGetFilmsQuery } from "~/graphql/gen/graphql";

type FilmSummary = GetFilmsQuery["films"][number];

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

const Movies = () => {
  const { loading, error, data, refetch } = useGetFilmsQuery();

  if (loading) {
    return (
      <Page>
        <Header />
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
        <Header />
        <Stack alignItems="flex-start" gap={2}>
          <Typography color="error" variant="body1">
            We couldn't load the films: {error.message}
          </Typography>
          <Button onClick={() => refetch()} variant="contained">
            Try again
          </Button>
        </Stack>
      </Page>
    );
  }

  const films = data?.films ?? [];

  return (
    <Page>
      <Header />
      <MoviesGrid>
        {films.map((film) => (
          <FilmCard film={film} key={film.id} />
        ))}
      </MoviesGrid>
    </Page>
  );
};

const Header = () => (
  <Box marginBottom={4}>
    <Typography component="h1" gutterBottom variant="h4">
      Studio Ghibli Films
    </Typography>
    <Link to="/">Back to welcome</Link>
  </Box>
);

interface FilmCardProps {
  film: FilmSummary;
}

const FilmCard = ({ film }: FilmCardProps) => (
  <Card>
    <Poster alt={film.title} src={film.image} />
    <CardContent>
      <Typography component="h2" variant="h6">
        {film.title}
      </Typography>
      <Typography
        color="text.secondary"
        fontStyle="italic"
        gutterBottom
        variant="subtitle2"
      >
        {film.tagline}
      </Typography>
      <DetailList>
        <DetailRow label="Director" value={film.director} />
        <DetailRow label="Released" value={film.releaseDate} />
        <DetailRow label="Runtime" value={`${film.runtime} min`} />
        <DetailRow label="Rotten Tomatoes" value={`${film.score}%`} />
      </DetailList>
      <Typography color="text.secondary" gutterBottom variant="body2">
        {film.description}
      </Typography>
      <Trivia items={film.trivia} />
    </CardContent>
  </Card>
);

interface TriviaProps {
  items: readonly string[];
}

const Trivia = ({ items }: TriviaProps) => (
  <section>
    <Typography component="h3" fontWeight={700} variant="body2">
      Trivia
    </Typography>
    <TriviaList>
      {items.map((item) => (
        <Typography component="li" key={item} variant="body2">
          {item}
        </Typography>
      ))}
    </TriviaList>
  </section>
);

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <Box display="flex" gap={1} justifyContent="space-between">
    <Typography component="dt" fontWeight={700} variant="body2">
      {label}
    </Typography>
    <Typography component="dd" margin={0} variant="body2">
      {value}
    </Typography>
  </Box>
);

const FilmCardSkeleton = () => (
  <Card>
    <Skeleton height={360} variant="rectangular" />
    <CardContent>
      <Skeleton height={32} width="70%" />
      <Skeleton />
      <Skeleton />
      <Skeleton width="80%" />
    </CardContent>
  </Card>
);

const Page = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const MoviesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(3),
}));

const Poster = styled("img")({
  display: "block",
  width: "100%",
  height: 360,
  objectFit: "cover",
});

const DetailList = styled("dl")(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

const TriviaList = styled("ul")(({ theme }) => ({
  margin: 0,
  marginTop: theme.spacing(0.5),
  paddingLeft: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

export default Movies;
