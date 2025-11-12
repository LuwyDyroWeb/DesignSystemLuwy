import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ButtonPage } from "./pages/component/ButtonPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ThemeContextProvider } from "./context/themeContext";
import { NotFoundPage } from "./pages/NoFoundPage";
import "./App.css";
import { RecursosDev } from "./pages/RecursosDev";
import { ColorsPage } from "./pages/core/ColorsPage";
import { SidebarPage } from "./pages/documentation/SidebarPage";
import { HeaderPage } from "./pages/documentation/HeaderPage";
import { FooterPage } from "./pages/documentation/FooterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ThemeContextProvider>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </ThemeContextProvider>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="recursos" element={<RecursosDev />} />
        <Route path="documentation/sidebar" element={<SidebarPage />} />
        <Route path="documentation/header" element={<HeaderPage />} />
        <Route path="documentation/footer" element={<FooterPage />} />
        <Route path="core/colores" element={<ColorsPage />} />
        <Route path="recursos" element={<RecursosDev />} />
        <Route path="componente/botones" element={<ButtonPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
