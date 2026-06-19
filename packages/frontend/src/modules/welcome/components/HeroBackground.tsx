import { styled } from "@mui/material";

/** Decorative sun and clouds layered behind the welcome hero content. */
export const HeroBackground = () => (
  <>
    <Sun aria-hidden="true" />
    <Cloud aria-hidden="true" data-variant="one" />
    <Cloud aria-hidden="true" data-variant="two" />
    <Cloud aria-hidden="true" data-variant="three" />
  </>
);

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
