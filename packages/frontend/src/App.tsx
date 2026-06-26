import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "~/routes.tsx";
import { LanguagePicker } from "~/shared/components/LanguagePicker";

const App = () => {
  const router = createBrowserRouter([...routes]);

  return (
    <>
      <LanguagePicker />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
