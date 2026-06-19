import type { RouteObject } from "react-router-dom";
import Movies from "~/modules/movies/Movies";
import Welcome from "~/modules/welcome/Welcome";
import ErrorPage from "~/shared/components/ErrorPage";
import NotFound from "~/shared/components/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movies",
    element: <Movies />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { routes };
