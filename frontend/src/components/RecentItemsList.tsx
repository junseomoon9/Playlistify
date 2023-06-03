import React, { useState, useEffect } from "react";
import { getTopItems } from "../api/requests";
import { useCookies } from "react-cookie";
import { RecentItem } from "./RecentItem";
import "./RecentItemsList.css";

export const RecentItemsList = () => {
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [cookies] = useCookies(["access-token", "refresh-token"]);

  const getRecentItems = async () => {
    try {
      const data = await getTopItems({
        type: "artists",
        access_token: cookies["access-token"],
      });
      console.log(data);
      setRecentItems(data);
    } catch {
      return;
    }
  };

  useEffect(() => {
    getRecentItems();
  }, []);

  return (
    <div className="recent-items-list-container">
      {recentItems.map((item) => (
        <RecentItem imgUrl={item.images[0].url} artistName={item.name}/>
      ))}
    </div>
  );
};