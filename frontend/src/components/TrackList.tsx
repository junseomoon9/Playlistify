import React, {useState, useEffect} from 'react'
import { RotateLoader } from 'react-spinners';
import { getRecommendations } from '../api/requests'
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { insertPlaylistItems, clearPlaylistItems } from "../redux/playlistItemsSlice";
import { useCookies } from "react-cookie";
import { TrackListItem } from './TrackListItem';
import "./TrackList.css"

export const TrackList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(["access-token", "refresh-token"]);
  const dispatch = useDispatch();
  const chosenTopItems = useSelector((state: RootState) => state.chosenTopItems.items);
  const playlistItems = useSelector((state: RootState) => state.playlistItems.items)

  const getTrackListSongs = async () => {
    try {
      if (chosenTopItems.length > 0) {
        setIsLoading(true)
      }
      dispatch(clearPlaylistItems())
      const seed_artists = chosenTopItems.map(item => item.id)
      const data = await getRecommendations({
        access_token: cookies["access-token"],
        seed_artists: seed_artists
      });
      dispatch(insertPlaylistItems(data.tracks))
      setIsLoading(false)
    } catch {
      setIsLoading(false)
      return;
    }
  };

  useEffect(() => {
    getTrackListSongs()
  }, [chosenTopItems])

  if (isLoading) {
    return (
      <div className='tracklist-loader-container'>
        <RotateLoader color="#1DB954"></RotateLoader>
      </div>
    )
  } else {
    if (playlistItems.length > 0) {
      return (
        <>
          <div className="divider"></div>
          <div className="track-list-title-container">
            <h2>TrackList</h2>
          </div>
          <div className="track-list-items-container">
            {playlistItems.map((track) => (
              <TrackListItem track={track}/>
            ))}
          </div>
        </>
      )
    } else {
      return <></>
    }
  }
}
