import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => (
  <Hero>
    <Sun aria-hidden="true" />
    <Cloud aria-hidden="true" data-variant="one" />
    <Cloud aria-hidden="true" data-variant="two" />
    <Cloud aria-hidden="true" data-variant="three" />
    <HeroCard>
      <Stack gap={2.5}>
        <Kicker>Studio Ghibli</Kicker>
        <Title>Worlds worth getting lost in</Title>
        <Lead>
          Studio Ghibli is the legendary Japanese animation studio behind
          beloved films such as Spirited Away, My Neighbor Totoro, and Princess
          Mononoke — celebrated for its hand-drawn artistry, richly imagined
          worlds, and heartfelt storytelling.
        </Lead>
        <Lead>
          Browse a selection of the studio's films and explore their details.
        </Lead>
        <Box>
          <Button component={Link} to="/movies" variant="contained">
            View Movies →
          </Button>
        </Box>
      </Stack>
    </HeroCard>
  </Hero>
);

const Hero = styled("section")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

const Sun = styled("div")({
  position: "absolute",
  top: "-90px",
  right: "-70px",
  width: 280,
  height: 280,
  borderRadius: "50%",
  background:
    "radial-gradient(circle at 50% 50%, #fff4cf 0%, #ffe49b 55%, rgba(255, 228, 155, 0) 72%)",
  pointerEvents: "none",
});

const Cloud = styled("div")({
  position: "absolute",
  background: "rgba(255, 255, 255, 0.85)",
  borderRadius: "50%",
  filter: "blur(9px)",
  pointerEvents: "none",
  '&[data-variant="one"]': { width: 220, height: 70, top: "16%", left: "9%" },
  '&[data-variant="two"]': { width: 160, height: 54, top: "28%", right: "13%" },
  '&[data-variant="three"]': {
    width: 280,
    height: 84,
    bottom: "12%",
    left: "20%",
  },
});

const HeroCard = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 620,
  background: "rgba(255, 253, 246, 0.82)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  borderRadius: 28,
  padding: theme.spacing(5),
  boxShadow: "0 24px 60px rgba(60, 80, 60, 0.18)",
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(3.5) },
}));

const Kicker = styled("span")(({ theme }) => ({
  alignSelf: "flex-start",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  fontSize: 13,
  fontWeight: 700,
  color: theme.palette.primary.dark,
  background: "rgba(143, 191, 131, 0.18)",
  padding: "4px 12px",
  borderRadius: 999,
}));

const Title = styled("h1")(({ theme }) => ({
  margin: 0,
  fontFamily: '"Quicksand", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
  lineHeight: 1.1,
  color: theme.palette.text.primary,
}));

const Lead = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.05rem",
  lineHeight: 1.7,
}));

export default Welcome;
