import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

type LoginPageProps = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t } = useTranslation("login-page");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "greta") {
      localStorage.setItem("isLoggedIn", "true"); // ✅ Persistir login
      onLogin();
      setPassword("");
      setError("");
      navigate("/");
    } else {
      setError(t("wrongPassword"));
      setPassword("");
    }
  };

  // La frase con iniciales rojas
  const phrase = t("clinicFullName");
  const phraseWithRedInitials = phrase.split(" ").map((word, index) => (
    <span key={index}>
      <span className="text-red-600">{word[0]}</span>
      {word.slice(1)}{" "}
    </span>
  ));

  return (
    <div className="flex flex-col items-center h-screen relative">
      {/* Language buttons top-right */}
      <LanguageSwitcher />

      {/* Logo image */}
      <img
        src="/logo-huellas.png"
        alt={t("clinicLogoAlt")}
        className="w-40 h-auto m-5"
      />

      <div className="bg-green-400 p-10 border-1 border-gray-600 rounded">
        <div className="bg-amber-50 border-1 border-gray-600 outline-12 outline-amber-100 py-6 px-12 rounded flex flex-col gap-5 items-center">
          {/* Title */}
          <h1 className="text-2xl font-bold text-red-600 bg-amber-100 border-1 border-gray-600 outline-10 outline-green-400 py-1 px-20 mx-5 mt-2 mb-8">
            {t("clinicTitle")}
          </h1>

          {/* Password box */}
          <div className="flex flex-col items-center gap-2 bg-amber-100 p-5 border-1 border-gray-600 outline-10 outline-amber-200">
            <p className="text-xl text-green-900 font-bold">
              {t("systemSubtitle")}
            </p>
            <p className="text-xl font-bold text-rose-500">
              {t("currentDate")}
            </p>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex flex-row justify-center items-center">
                <p className="text-lg text-green-800 font-bold leading-none pb-3">
                  {t("enterPassword")}
                </p>
                <input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="border p-2 mb-2 bg-amber-50 ml-4 w-30 h-10"
                />
              </div>

              {/* Error message */}
              {error && <p className="text-red-600 font-bold mt-1">{error}</p>}

              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-amber-50 text-lg font-semibold px-6 py-3 rounded-md shadow-sm hover:shadow-md transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                {t("loginButton")}
              </button>
            </form>
          </div>

          <p className="text-green-600 font-bold text-xl py-2">
            {t("revisionDate")}
          </p>
          <p className="text-2xl font-bold text-green-900 bg-amber-100 px-5 py-3 border-1 border-gray-600 outline-10 outline-amber-200">
            {phraseWithRedInitials}
          </p>
        </div>
      </div>
    </div>
  );
}
