import "./PlayVideo.css";
import React, { useEffect, useState } from "react";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [apidata, setapidata] = useState(null);
  const [channelData, setchannelData] = useState(null);
  const [commentData, setcommentData] = useState([]);

  
  const fetchcommentdata = async () => {
    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentData_url)
      .then((res) => res.json())
      .then((data) => setcommentData(data.items))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  useEffect(() => {
    if (videoId) fetchcommentdata();
  }, [videoId]);

  
  const fetchChanneldata = async () => {
    if (!apidata) return; 
    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url)
      .then((res) => res.json())
      .then((data) => setchannelData(data.items[0]))
      .catch((error) => console.error("Error fetching channel data:", error));
  };

  useEffect(() => {
    fetchChanneldata();
  }, [apidata]);

 
  const fetchVideodata = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setapidata(data.items[0]))
      .catch((error) => console.error("Error fetching video data:", error));
  };

  useEffect(() => {
    if (videoId) fetchVideodata();
  }, [videoId]);

  return (
    <div className="play-video">
      
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <h3>{apidata ? apidata.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apidata ? value_converter(apidata.statistics.viewCount) : "16k"} views &bull;{" "}
          {apidata ? moment(apidata.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? value_converter(apidata.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />
            {apidata ? value_converter(apidata.statistics.dislikeCount) : 155}
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />

      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : ""}</p>
          <span>
            {channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apidata ? apidata.snippet.description.slice(0, 250) : "Description Here"}</p>
        <p>Subscribe to Greatstack to watch more tutorials on web development.</p>
        <hr />
        <h4>{apidata ? value_converter(apidata.statistics.commentCount) : 102} Comments</h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>
                    {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                  </span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(item.snippet.topLevelComment.snippet.likeCount)}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
