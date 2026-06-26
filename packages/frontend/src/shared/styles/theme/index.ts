import { createTheme, type Direction, type ThemeOptions } from "@mui/material";
import { components } from "./components";
import { palette } from "./palette";
import { typography } from "./typography";

const themeOptions: ThemeOptions = {
  typography,
  palette,
};

/** Builds the app theme for a text direction (RTL for locales like Arabic). */
export const createAppTheme = (direction: Direction = "ltr") =>
  createTheme({
    ...themeOptions,
    direction,
    components: {
      ...components,
    },
  });

// Direction-independent instance for things that only read the palette
// (e.g. global styles).
export const theme = createAppTheme();
