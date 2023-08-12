import React, { useRef } from "react";
import "./TrackListItem.css";
import { convert_ms_to_minutes_and_seconds } from "../utils/utils";

export const TrackListItem = ({ track }: any) => {
  const audioElem = useRef<HTMLAudioElement>(null);

  const handleMouseEnterOnPreview = () => {
    if (audioElem && audioElem.current) {
      audioElem.current.play()
    }
  };

  const handleMouseLeaveOnPreview = () => {
    if (audioElem && audioElem.current) {
      audioElem.current.pause()
    }
  };

  return (
    <div className="track-list-item-container">
      <img src={track.album.images[0].url} alt="album" />
      <div className="track-list-item-title-and-artist-container">
        <h2 className="track-list-item-title">{track.name}</h2>
        <p className="track-list-item-artist">{track.artists[0].name}</p>
      </div>
      {track.preview_url && (
        <div
          className="track-list-item-preview"
          onMouseEnter={() => handleMouseEnterOnPreview()}
          onMouseLeave={() => handleMouseLeaveOnPreview()}
        >
          <p>Play Preview</p>
        </div>
      )}
      <div className="track-list-item-duration">
        <p>{convert_ms_to_minutes_and_seconds(track.duration_ms)}</p>
      </div>
      <audio src={track.preview_url} ref={audioElem}/>
    </div>
  );
};
