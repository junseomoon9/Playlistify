import React, { useEffect, useContext } from "react";
import { getUserProfile, refreshAccessToken } from "../api/requests";
import { useCookies } from "react-cookie";
import UserContext from "../contexts/UserContext";
import { RecentItemsList } from "../components/RecentItemsList";
import { TrackList } from "../components/TrackList";
import { Settings } from "../components/Settings";
import "./AppPage.css"

export const AppPage = () => {
  const userContext = useContext(UserContext);
  const [cookies, setCookie] = useCookies(['access-token', 'refresh-token']);

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

  useEffect(() => {
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
        <div className="title-container">
          <h1>Playlistify</h1>
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
