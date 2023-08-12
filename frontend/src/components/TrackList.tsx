import React, {useState, useEffect} from 'react'
import { RotateLoader } from 'react-spinners';
import { getRecommendations } from '../api/requests'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import { TrackListItem } from './TrackListItem';
import "./TrackList.css"

export const TrackList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackListSongs, setTrackListSongs] = useState<any[]>([]);
  const [cookies] = useCookies(["access-token", "refresh-token"]);
  const chosenTopItems = useSelector((state: RootState) => state.chosenTopItems.items);

  const getTrackListSongs = async () => {
    try {
      if (chosenTopItems.length > 0) {
        setIsLoading(true)
      }
      setTrackListSongs([]);
      const data = await getRecommendations({
        access_token: cookies["access-token"],
        seed_artists: chosenTopItems
      });
      setTrackListSongs(data.tracks);
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
      <div className='loader-container'>
        <RotateLoader color="#1DB954"></RotateLoader>
      </div>
    )
  } else {
    if (trackListSongs.length > 0) {
      return (
        <>
          <div className="track-list-title-container">
            <h2>TrackList</h2>
          </div>
          <div className="track-list-items-container">
            {trackListSongs.map((track) => (
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
