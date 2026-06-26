import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";
import { IS_DEV } from "~/shared/constants";

//TODO implement error page
export default function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();

  if (IS_DEV) {
    console.error("Error caught at boundary:", error);
  }

  return (
    <div id="error-page">
      <h1>{t("error.heading")}</h1>
      <p>{t("error.message")}</p>
      <p>{error instanceof Error ? error.name : t("error.unknown")} </p>
    </div>
  );
}
