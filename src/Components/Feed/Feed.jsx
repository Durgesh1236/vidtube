import "./Feed.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import { useEffect, useState } from "react";
import React from "react";

const Feed = ({ category, searchQuery }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    // if(category){
    let videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&locale=India&maxResults=500&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    // }

    if (searchQuery && !category) {
      videoListUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(
        searchQuery
      )}&key=${API_KEY}&type=video`;
    }

    try {
      const response = await fetch(videoListUrl);
      const result = await response.json();

      if (searchQuery) {
        setData(
          result.items.map((item) => ({
            ...item,
            id: item.id.videoId || item.id, 
          }))
        );
      } else {
        setData(result.items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, searchQuery]); 

  return (
    <div className="feed">
      {data.map((item, index) => (
        <Link
          key={index}
          to={`video/${item.snippet.categoryId || category}/${item.id}`} 
          className="card"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <h2>{item.snippet.title.replace(/&quot;/g, '"')}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics?.viewCount || 0)} views &bull;{" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
