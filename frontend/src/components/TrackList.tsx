import React, {useState, useEffect} from 'react'
import { getRecommendations } from '../api/requests'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import "./TrackList.css"

export const TrackList = () => {
  const [trackListSongs, setTrackListSongs] = useState<any[]>([]);
  const [cookies] = useCookies(["access-token", "refresh-token"]);
  const chosenTopItems = useSelector((state: RootState) => state.chosenTopItems.items);

  const getTrackListSongs = async () => {
    try {
      const data = await getRecommendations({
        access_token: cookies["access-token"],
        seed_artists: chosenTopItems
      });
      setTrackListSongs(data);
    } catch {
      return;
    }
  };

  useEffect(() => {
    getTrackListSongs()
  }, [chosenTopItems])

  return (
    <div className="track-list-items-container">
        <div className="track-list-title-container">
          <h2>TrackList</h2>
        </div>
    </div>
  )
}
