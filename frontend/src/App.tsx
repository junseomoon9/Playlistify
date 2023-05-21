import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthorizationProvider } from "./contexts/AuthorizationContext";
import { LandingPage } from "./pages/LandingPage";
import { AuthorizationCallbackPage } from "./pages/AuthorizationCallbackPage";
import { AppPage } from "./pages/AppPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthorizationProvider>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/callback" element={<AuthorizationCallbackPage />}/>
          <Route path="/app" element={<AppPage />}/>
        </Routes>
      </AuthorizationProvider>
    </BrowserRouter>
  );
}

export default App;
