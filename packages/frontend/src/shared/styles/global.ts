import { css } from "@mui/material";
import { theme } from "~/shared/styles/theme";

export const globalStyles = css`
  body,
  html,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100%;
    background-color: ${theme.palette.background.default};
    background-image: linear-gradient(
      180deg,
      #cde7f3 0%,
      #e6f1e2 42%,
      ${theme.palette.background.default} 100%
    );
    background-attachment: fixed;
    color: ${theme.palette.text.primary};
    font-family: "Nunito", "Segoe UI", Roboto, sans-serif;
  }
`;
