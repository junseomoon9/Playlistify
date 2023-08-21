import React, { useEffect, useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import { useCookies } from "react-cookie";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { createPlaylist, addItemsToPlaylist } from "../api/requests";
import "./Settings.css";

export const Settings = () => {
  const userContext = useContext(UserContext);
  const [cookies] = useCookies(["access-token", "refresh-token"]);
  const playlistNameInputRef = useRef<HTMLInputElement>(null);
  const playlistItems = useSelector(
    (state: RootState) => state.playlistItems.items
  );

  const createAndPopulatePlaylist = async () => {
    try {
      if (playlistNameInputRef.current) {
        const playlistData = await createPlaylist({
          access_token: cookies["access-token"],
          userID: userContext?.userID,
          playlist_name: playlistNameInputRef.current.value,
        });

        const uris = playlistItems.map((item) => (
          item.uri
        ))

        await addItemsToPlaylist({
          access_token: cookies["access-token"],
          playlist_id: playlistData.id,
          uris: uris
        })
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaylistCreateButtonClick = () => {
    createAndPopulatePlaylist();
  };

  return (
    <div className="settings-components-container">
      <div className="create-playlist-container">
        <h2>Playlist Name</h2>
        <input type="text" ref={playlistNameInputRef} />
        <button onClick={() => handlePlaylistCreateButtonClick()}>
          Create Playlist
        </button>
      </div>
      <div className="settings-options-container"></div>
    </div>
  );
};
