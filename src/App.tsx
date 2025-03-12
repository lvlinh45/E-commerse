import { Fragment, Suspense } from "react";
import NotFound from "./pages/notFound";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <>
      <Suspense fallback={<NotFound></NotFound>}>
        <Fragment>
          <AppRoute></AppRoute>
        </Fragment>
      </Suspense>
    </>
  );
}

export default App;
