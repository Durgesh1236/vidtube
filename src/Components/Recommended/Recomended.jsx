import "./Recomended.css"
import React, { useEffect, useState } from 'react'
import { API_KEY, value_converter } from "../../data"
import { Link } from "react-router-dom"

 const Recomended = ({categoryId}) => {

    const[apiData, setapidata] = useState([]);

    const fettchData = async () => {
        const fetchdata_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(fetchdata_url).then(res=>res.json()).then(data=>setapidata(data.items))
    }
    useEffect (() =>{
        fettchData();
    },[])
    return (
        <div className="recomended">
            {apiData.map((item, index) =>{
               return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="vid-info">
                    <h4>{item.snippet.title}</h4>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{value_converter(item.statistics.viewCount)} View</p>
                </div>
            </Link>
             )
            })}
        </div>
    )
}

export default Recomended