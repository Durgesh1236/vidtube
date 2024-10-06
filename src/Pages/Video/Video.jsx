import "./video.css"
import React from "react"
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recomended from "../../Components/Recommended/Recomended"
import { useParams } from "react-router-dom"

 const Video = () => {

  const{videoId, categoryId} = useParams();
  console.log(videoId);
  console.log(categoryId);
    return (
      <div className="play-container">
        < PlayVideo videoId={videoId} categoryId={categoryId}/>
        <Recomended categoryId={categoryId}/>
      </div>
    )
  }

  export default Video
  
  