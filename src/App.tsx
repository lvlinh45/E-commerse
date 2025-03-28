import { Fragment, Suspense } from "react";
import NotFoundPage from "./pages/notFound";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <>
      <Suspense fallback={<NotFoundPage></NotFoundPage>}>
        <Fragment>
          <AppRoute></AppRoute>
        </Fragment>
      </Suspense>
    </>
  );
}

export default App;
