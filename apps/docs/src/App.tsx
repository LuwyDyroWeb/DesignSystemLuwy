import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ButtonPage } from "./pages/component/ButtonPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ThemeContextProvider } from "./context/themeContext";
import { NotFoundPage } from "./pages/NoFoundPage";
import "./App.css";
import { TokensPage } from "./pages/install/TokensPage";
import { InstallPage } from "./pages/install/InstallPage";
import { ChangelogPage } from "./pages/install/ChangelogPage";
import { StructurePage } from "./pages/install/StrucutrePage";
import { SidebarPage } from "./pages/layout/SidebarPage";
import { HeaderPage } from "./pages/layout/HeaderPage";
import { FooterPage } from "./pages/layout/FooterPage";
import { ColorsPage } from "./pages/content/ColorsPage";
import { TipografiaPage } from "./pages/content/TipografiaPage";
import { AccordionPage } from "./pages/component/AccordionPage";
import { DropdownPage } from "./pages/component/DropdownPage";
function App() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />}/>

      {/* RUTAS PRIVADAS */}
      <Route path="/*" element={<ProtectedRoute />}>
        <Route
          // path="/"
          element={
            <ThemeContextProvider>
              <DashboardLayout />
            </ThemeContextProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="documentacion/tokens" element={<TokensPage />} />
          <Route path="documentacion/instalacion" element={<InstallPage />} />
          <Route path="documentacion/changelog" element={<ChangelogPage />} />
          <Route path="documentacion/estructura" element={<StructurePage />} />
          <Route path="layout/sidebar" element={<SidebarPage />} />
          <Route path="layout/header" element={<HeaderPage />} />
          <Route path="layout/footer" element={<FooterPage />} />
          <Route path="content/colores" element={<ColorsPage />} />
          <Route path="content/tipografia" element={<TipografiaPage />} />
          <Route path="componente/botones" element={<ButtonPage />} />
          <Route path="componente/accordion" element={<AccordionPage />} />
          <Route path="componente/dropdown" element={<DropdownPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
