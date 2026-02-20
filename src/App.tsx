import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import MainMenuPage from "./pages/main-menu/MainMenuPage";
import PatientLocatorPage from "./pages/patient-locator/PatientLocatorPage";
import { OwnersProvider } from "./features/owners/context/OwnersContext";
import { PetsProvider } from "./features/pets/context/PetsContext";

export default function App() {
  // Por defecto es false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <OwnersProvider>
        <PetsProvider>
          <Routes>
            {/* Login siempre accesible */}
            <Route
              path="/login"
              element={
                <LoginPage
                  onLogin={() => {
                    localStorage.setItem("isLoggedIn", "true"); // Persistir login
                    setIsLoggedIn(true); // Actualiza el state
                  }}
                />
              }
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
        </PetsProvider>
      </OwnersProvider>
    </BrowserRouter>
  );
}
