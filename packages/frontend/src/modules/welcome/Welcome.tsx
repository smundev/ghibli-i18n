import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => (
  <Page>
    <Stack gap={3} maxWidth={640}>
      <Typography component="h1" variant="h3">
        Studio Ghibli
      </Typography>
      <Typography color="text.secondary" variant="body1">
        Studio Ghibli is the legendary Japanese animation studio behind beloved
        films such as <em>Spirited Away</em>, <em>My Neighbor Totoro</em>, and{" "}
        <em>Princess Mononoke</em>. Founded in 1985 by Hayao Miyazaki, Isao
        Takahata, and Toshio Suzuki, the studio is celebrated for its hand-drawn
        artistry, richly imagined worlds, and heartfelt storytelling.
      </Typography>
      <Typography color="text.secondary" variant="body1">
        Browse a selection of the studio's films and explore their details.
      </Typography>
      <Box>
        <Link to="/movies">
          <Button variant="contained">View Movies</Button>
        </Link>
      </Box>
    </Stack>
  </Page>
);

const Page = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 4),
}));

export default Welcome;
