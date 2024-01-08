import React from "react";
import "./LandingPage.css";

export const LandingPage = () => {
  const login = () => {
    window.location.href="http://localhost:8888/login";
  }

  return (
    <div className="landing-page">
      <h1 className="landing-page-title">Playlistify</h1>
      <h2 className="lading-page-subtitle">Generate New Music Suggestions Based on Your Top Favorite Artists.</h2>
      <button className="landing-page-login-button" onClick={login}>Connect to Spotify</button>
    </div>
  );
};
