import React, { useEffect } from "react";
import { RecentItemsList } from "../components/RecentItemsList";
import { TrackList } from "../components/TrackList";
import "./AppPage.css"

export const AppPage = () => {

  return (
    <div className="app-page">
      <div className="app-page-container">
        <div className="title-container">
          <h1>Playlistify</h1>
        </div>
        <div className="subtitle-container">
          <h2>Generate playlists with new music based on your top favorite artists or tracks.</h2>
        </div>
        <div className="recent-items-container">
          <RecentItemsList></RecentItemsList>
        </div>
        <div className="divider"></div>
        <div className="playlist-details-container">
          <div className="track-list-container">
            <TrackList />
          </div>
          <div className="playlist-settings-container">

          </div>
        </div>
      </div>
    </div>
  );
};
