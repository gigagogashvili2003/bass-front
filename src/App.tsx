import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./config/routes";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("upload-text");
    }
  }, [location]);

  return (
    <Routes>
      {routes.map(({ Component, Layout, path }) => (
        <Route
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
