import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { LandingPage } from "./pages/LandingPage";
import { AuthorizationCallbackPage } from "./pages/AuthorizationCallbackPage";
import { AppPage } from "./pages/AppPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/callback" element={<AuthorizationCallbackPage />}/>
          <Route path="/app" element={<AppPage />}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
