import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Layout from "./layouts/layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
