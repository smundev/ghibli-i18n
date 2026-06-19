import { Button, Skeleton, styled, Typography } from "@mui/material";
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
        <ErrorPanel>
          <Typography color="error" variant="body1">
            We couldn't load the films: {error.message}
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
  <HeaderWrap>
    <BackLink to="/">← Back to welcome</BackLink>
    <PageTitle>Studio Ghibli Films</PageTitle>
    <Subtitle>Ten tales of flight, forests, and far-off places.</Subtitle>
  </HeaderWrap>
);

interface FilmCardProps {
  film: FilmSummary;
}

const FilmCard = ({ film }: FilmCardProps) => (
  <FilmCardRoot>
    <PosterWrap>
      <Poster alt={film.title} src={film.image} />
      <ScoreBadge>★ {film.score}%</ScoreBadge>
    </PosterWrap>
    <Body>
      <FilmTitle>{film.title}</FilmTitle>
      <Tagline>{film.tagline}</Tagline>
      <MetaRow>
        <Meta label="Director" value={film.director} />
        <Meta label="Released" value={film.releaseDate} />
        <Meta label="Runtime" value={`${film.runtime} min`} />
      </MetaRow>
      <Description>{film.description}</Description>
      <Trivia items={film.trivia} />
    </Body>
  </FilmCardRoot>
);

interface MetaProps {
  label: string;
  value: string;
}

const Meta = ({ label, value }: MetaProps) => (
  <MetaChip>
    <MetaLabel>{label}</MetaLabel>
    <MetaValue>{value}</MetaValue>
  </MetaChip>
);

interface TriviaProps {
  items: readonly string[];
}

const Trivia = ({ items }: TriviaProps) => (
  <section>
    <TriviaHeading>Trivia</TriviaHeading>
    <TriviaList>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </TriviaList>
  </section>
);

const FilmCardSkeleton = () => (
  <FilmCardRoot>
    <Skeleton height={340} variant="rectangular" />
    <Body>
      <Skeleton height={30} width="70%" />
      <Skeleton width="55%" />
      <Skeleton height={52} variant="rounded" />
      <Skeleton />
      <Skeleton width="85%" />
    </Body>
  </FilmCardRoot>
);

const Page = styled("div")(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(5, 4),
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(3, 2) },
}));

const HeaderWrap = styled("header")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

const BackLink = styled(Link)(({ theme }) => ({
  alignSelf: "flex-start",
  color: theme.palette.secondary.dark,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  "&:hover": { textDecoration: "underline" },
}));

const PageTitle = styled("h1")(({ theme }) => ({
  margin: 0,
  fontFamily: '"Quicksand", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
  color: theme.palette.text.primary,
}));

const Subtitle = styled("p")(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

const MoviesGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
  gap: theme.spacing(3),
}));

const FilmCardRoot = styled("article")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.paper,
  borderRadius: 22,
  overflow: "hidden",
  border: "1px solid rgba(91, 138, 82, 0.14)",
  boxShadow: "0 10px 30px rgba(60, 80, 60, 0.10)",
  transition: "transform 200ms ease, box-shadow 200ms ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 22px 44px rgba(60, 80, 60, 0.18)",
  },
}));

const PosterWrap = styled("div")({
  position: "relative",
  lineHeight: 0,
});

const Poster = styled("img")({
  display: "block",
  width: "100%",
  height: 340,
  objectFit: "cover",
});

const ScoreBadge = styled("span")({
  position: "absolute",
  top: 12,
  right: 12,
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  background: "rgba(47, 42, 38, 0.82)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 13,
  padding: "4px 10px",
  borderRadius: 999,
  backdropFilter: "blur(2px)",
});

const Body = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2.5),
}));

const FilmTitle = styled("h2")(({ theme }) => ({
  margin: 0,
  fontFamily: '"Quicksand", sans-serif',
  fontWeight: 700,
  fontSize: "1.3rem",
  lineHeight: 1.2,
  color: theme.palette.text.primary,
}));

const Tagline = styled("p")(({ theme }) => ({
  margin: 0,
  fontStyle: "italic",
  fontSize: "0.95rem",
  color: theme.palette.primary.dark,
}));

const MetaRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const MetaChip = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "rgba(91, 138, 82, 0.10)",
  borderRadius: 12,
  padding: "6px 10px",
});

const MetaLabel = styled("span")(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: 10,
  fontWeight: 700,
  color: theme.palette.text.secondary,
}));

const MetaValue = styled("span")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const Description = styled("p")(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: "0.92rem",
  lineHeight: 1.6,
}));

const TriviaHeading = styled("h3")(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(0.5),
  fontFamily: '"Quicksand", sans-serif',
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: theme.palette.secondary.dark,
}));

const TriviaList = styled("ul")(({ theme }) => ({
  margin: 0,
  paddingLeft: "1.1rem",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  fontSize: "0.85rem",
  lineHeight: 1.5,
  "& li::marker": { color: theme.palette.primary.main },
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
