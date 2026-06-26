import { Skeleton, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { GetFilmsQuery } from "~/graphql/gen/graphql";

type FilmSummary = GetFilmsQuery["films"][number];

interface FilmCardProps {
  film: FilmSummary;
}

export const FilmCard = ({ film }: FilmCardProps) => {
  const { t } = useTranslation();

  return (
    <FilmCardRoot>
      <PosterWrap>
        <Poster alt={film.title} src={film.image} />
        <ScoreBadge title={t("film.scoreSource")}>★ {film.score}%</ScoreBadge>
      </PosterWrap>
      <Body>
        <FilmTitle>{film.title}</FilmTitle>
        <Tagline>{film.tagline}</Tagline>
        <MetaRow>
          <Meta label={t("film.director")} value={film.director} />
          <Meta label={t("film.releaseDate")} value={film.releaseDate} />
          <Meta
            label={t("film.runtime")}
            value={`${film.runtime} ${t("film.runtimeUnit")}`}
          />
        </MetaRow>
        <Description>{film.description}</Description>
        <Trivia items={film.trivia} />
      </Body>
    </FilmCardRoot>
  );
};

export const FilmCardSkeleton = () => (
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

const Trivia = ({ items }: TriviaProps) => {
  const { t } = useTranslation();

  return (
    <section>
      <TriviaHeading>{t("film.trivia")}</TriviaHeading>
      <TriviaList>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </TriviaList>
    </section>
  );
};

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
