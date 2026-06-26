import { ApolloProvider } from "@apollo/client";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.tsx";
import apolloClient from "~/apollo";
import { isRtlLocale } from "~/i18n";
import { LocaleProvider, useLocale } from "~/i18n/LocaleProvider";
import { globalStyles } from "~/shared/styles/global";
import { createAppTheme } from "~/shared/styles/theme";

const AppRoot = () => {
  const { locale } = useLocale();
  const theme = useMemo(
    () => createAppTheme(isRtlLocale(locale) ? "rtl" : "ltr"),
    [locale]
  );

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles} />
        <CssBaseline enableColorScheme />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const enableMocking = async () => {
  if (import.meta.env.MODE !== "test") {
    return;
  }

  const { worker } = await import("~/tests/mocks/browser");

  return worker.start();
};

enableMocking().then(() => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element #root not found");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LocaleProvider>
        <AppRoot />
      </LocaleProvider>
    </React.StrictMode>
  );
});
