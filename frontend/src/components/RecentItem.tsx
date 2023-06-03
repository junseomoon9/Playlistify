import React, { useState } from "react";
import "./RecentItem.css";

interface props {
  imgUrl: string;
  artistName: string;
}

export const RecentItem = ({ imgUrl, artistName }: props) => {
  const [selected, setSelected] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (selected) {
      e.currentTarget.style.border = ""
    } else {
      e.currentTarget.style.border = "0.3rem solid #1DB954"
    }
    setSelected(!selected)
  }

  return (
    <div className="recent-item-container">
      <img src={imgUrl} alt="artist" onClick={handleClick}></img>
      <p>{artistName}</p>
    </div>
  );
};
