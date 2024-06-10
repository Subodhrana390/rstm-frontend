import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Layout from "./layouts/layout";
import UserProfilePage from "./page/Dashboard/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateProjectPage from "./page/Dashboard/CreateProjectPage";
import DashboardLayout from "./layouts/DashboardLayout";
import EditProjectPage from "./page/Dashboard/EditProjectPage";
import ListOfProjects from "./page/Dashboard/ListOfProjects";
import UserRoute from "./auth/UserRoute";

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

      <Route element={<UserRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <ListOfProjects />
            </DashboardLayout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard/create"
          element={
            <DashboardLayout>
              <CreateProjectPage />
            </DashboardLayout>
          }
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard/edit/:id"
          element={
            <DashboardLayout>
              <EditProjectPage />
            </DashboardLayout>
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
