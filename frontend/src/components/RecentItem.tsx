import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { chooseTopItem, removeTopItem } from "../redux/chosenTopItemsSlice";
import "./RecentItem.css";

interface props {
  id: string;
  imgUrl: string;
  artistName: string;
}

export const RecentItem = ({ id, imgUrl, artistName }: props) => {
  const [selected, setSelected] = useState(false)
  const dispatch = useDispatch()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (selected) {
      dispatch(removeTopItem(id))
      e.currentTarget.style.border = ""
    } else {
      dispatch(chooseTopItem(id))
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
