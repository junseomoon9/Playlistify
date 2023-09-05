import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import { useCookies } from "react-cookie";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { createPlaylist, addItemsToPlaylist } from "../api/requests";
import "./Settings.css";

export const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [playlistLink, setPlaylistLink] = useState<null | string>(null);
  const userContext = useContext(UserContext);
  const [cookies] = useCookies(["access-token", "refresh-token"]);
  const playlistNameInputRef = useRef<HTMLInputElement>(null);
  const chosenTopItems = useSelector(
    (state: RootState) => state.chosenTopItems.items
  );
  const playlistItems = useSelector(
    (state: RootState) => state.playlistItems.items
  );

  const [playlistNameChanged, setPlaylistNameChanged] = useState(false);

  const createAndPopulatePlaylist = async () => {
    try {
      if (playlistNameInputRef.current) {
        // Display Loader
        setIsLoading(true);

        // Create Playlist in spotify
        const playlistData = await createPlaylist({
          access_token: cookies["access-token"],
          userID: userContext?.userID,
          playlist_name: playlistNameInputRef.current.value,
        });

        // Get uris of all songs
        const uris = playlistItems.map((item) => item.uri);

        // Add songs to playlist in spotify
        await addItemsToPlaylist({
          access_token: cookies["access-token"],
          playlist_id: playlistData.id,
          uris: uris,
        });

        const spotifyLink = playlistData.external_urls.spotify;

        // Remove Loader
        setIsLoading(false);
        setPlaylistLink(spotifyLink.toString());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaylistNameInputChange = () => {
    setPlaylistNameChanged(true);
  };

  const handlePlaylistCreateButtonClick = () => {
    createAndPopulatePlaylist();
  };

  useEffect(() => {
    if (!playlistNameChanged) {
      const artist_names_arr = chosenTopItems.map((item) => item.artistName);
      const artist_names = artist_names_arr.join(" / ");
      if (playlistNameInputRef.current) {
        playlistNameInputRef.current.value = `Playlistify Playlist: ${artist_names}`;
      }
    }
    setPlaylistLink(null)
  }, [chosenTopItems, playlistItems]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="settings-loader-container">
          <ClipLoader color="#1DB954" />
        </div>
      )
    }

    if (playlistLink) {
      return (
        <div className="playlist-creation-success-messages-container">
          <h2>Playlist Created</h2>
          <a href={playlistLink} target="_blank">View Playlist on Spotify</a>
        </div>
      )
    }

    return (
      <>
        <h2>Playlist Name</h2>
        <input
          type="text"
          ref={playlistNameInputRef}
          onChange={() => handlePlaylistNameInputChange()}
        />
        <button onClick={() => handlePlaylistCreateButtonClick()}>
          Create Playlist
        </button>
      </>
    )
  }

  // We display settings once user clicks on at least one top item
  if (chosenTopItems.length > 0) {
    return (
      <>
        <div className="divider"></div>
        <div className="settings-components-container">
          <div className="create-playlist-container">
            {renderContent()}
          </div>
          <div className="settings-options-container"></div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
