import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import { useState } from "react";

function App() {
  const [userToken, _setUserToken] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:user" element={<MainPage userToken={userToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
