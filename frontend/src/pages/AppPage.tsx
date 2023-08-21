import React, { useEffect, useContext } from "react";
import { getAccessToken, getUserProfile } from "../api/requests";
import { useCookies } from "react-cookie";
import UserContext from "../contexts/UserContext";
import { RecentItemsList } from "../components/RecentItemsList";
import { TrackList } from "../components/TrackList";
import { Settings } from "../components/Settings";
import "./AppPage.css"

export const AppPage = () => {
  const userContext = useContext(UserContext);
  const [cookies, setCookie] = useCookies(['access-token', 'refresh-token']);

  const getUserProfileAndSetUserID = async () => {
    const userData = await getUserProfile({access_token: cookies["access-token"]})
    userContext?.setUserID(userData.id)
  }

  useEffect(() => {
    getUserProfileAndSetUserID()
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
        <div className="divider"></div>
        <div className="settings-container">
          <Settings />
        </div>
        <div className="divider"></div>
        <div className="track-list-container">
          <TrackList />
        </div>
      </div>
    </div>
  );
};
