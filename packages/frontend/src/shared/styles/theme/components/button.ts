import type { Components, Theme } from "@mui/material";

export const MuiButton: Components<Theme>["MuiButton"] = {
  variants: [
    {
      props: { variant: "contained" },
      style: ({ theme }) => ({
        borderRadius: 999,
        padding: "10px 26px",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: 16,
        textTransform: "none",
        boxShadow: "0 6px 16px rgba(63, 107, 63, 0.25)",
        transition:
          "transform 150ms ease, box-shadow 150ms ease, background-color 150ms ease",

        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "0 10px 22px rgba(63, 107, 63, 0.32)",
          transform: "translateY(-1px)",
        },

        "&:disabled": {
          cursor: "not-allowed",
        },
      }),
    },
  ],
};
