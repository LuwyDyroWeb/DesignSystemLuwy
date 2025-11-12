import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ButtonPage } from './pages/component/ButtonPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { NotFoundPage } from './pages/NoFoundPage';
import "./App.css";
import { RecursosDev } from './pages/RecursosDev';



function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
        <Route index element={<HomePage />} />
        <Route path="recursos" element={<RecursosDev />} />
        <Route path="componente/botones" element={<ButtonPage />} />
        <Route path="recursos" element={<RecursosDev />} />
      </Route>

      <Route path='*' element={<NotFoundPage/>}></Route>
    </Routes>
  );
}

export default App;