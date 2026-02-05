import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainMenuPage from "./pages/Main Menu/MainMenuPage";
import PatientLocatorPage from "./pages/Patient Locator/PatientLocatorPage";

export default function App() {
  // Por defecto es false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login siempre accesible */}
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
        />

        {/* Menú principal protegido */}
        <Route
          path="/"
          element={isLoggedIn ? <MainMenuPage /> : <Navigate to="/login" />}
        />

        {/* Localizador protegido */}
        <Route
          path="/patients"
          element={
            isLoggedIn ? <PatientLocatorPage /> : <Navigate to="/login" />
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
