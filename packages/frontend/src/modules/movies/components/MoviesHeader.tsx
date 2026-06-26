import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const MoviesHeader = () => {
  const { t } = useTranslation();

  return (
    <HeaderWrap>
      <BackLink to="/">← {t("movies.backToWelcome")}</BackLink>
      <PageTitle>{t("movies.heading")}</PageTitle>
      <Subtitle>{t("movies.subtitle")}</Subtitle>
    </HeaderWrap>
  );
};

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
