import React, { useEffect, useContext } from "react";
import { getUserProfile, refreshAccessToken } from "../api/requests";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import UserContext from "../contexts/UserContext";
import { RecentItemsList } from "../components/RecentItemsList";
import { TrackList } from "../components/TrackList";
import { Settings } from "../components/Settings";
import "./AppPage.css"

export const AppPage = () => {
  const userContext = useContext(UserContext);
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['access-token', 'refresh-token']);

  const checkAuthorization = () => {
    if (!cookies["access-token"] || !cookies["refresh-token"]) {
      logout()
    }
  }

  const refreshAndUpdateAccessToken = async () => {
    const tokenData = await refreshAccessToken({refresh_token: cookies["refresh-token"]})
    let expires = new Date()
    expires.setTime(expires.getTime() + (tokenData.expires_in * 1000))
    setCookie('access-token', tokenData.access_token, {path: "/", expires: expires})
  }

  const getUserProfileAndSetUserID = async () => {
    const userData = await getUserProfile({access_token: cookies["access-token"]})
    userContext?.setUserID(userData.id)
  }

  const logout = () => {
    removeCookie("access-token")
    removeCookie("refresh-token")
    navigate("/", { replace: true })
  }

  useEffect(() => {
    checkAuthorization()

    getUserProfileAndSetUserID()

    // Every 50 minutes, spotify access token is refreshed
    const interval = setInterval(() => {
      refreshAndUpdateAccessToken()
    }, 3000000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app-page">
      <div className="app-page-container">
        <div className="title-and-logout-container">
          <h1 className="title">Playlistify</h1>
          <button className="logout-button" onClick={() => logout()}>Log Out</button>
        </div>
        <div className="subtitle-container">
          <h2>Generate playlists with new music based on your top favorite artists.</h2>
        </div>
        <div className="recent-items-container">
          <RecentItemsList></RecentItemsList>
        </div>
        <div className="settings-container">
          <Settings />
        </div>
        <div className="track-list-container">
          <TrackList />
        </div>
      </div>
    </div>
  );
};
