import "./Home.css"
import { useState } from "react"
import React from "react"
import Feed from "../../Components/Feed/Feed"
import Sidebar from "../../Components/Sidebar/Sidebar"
 const Home = (({sidebar, searchQuery}) =>{
  const [category, setCategory] = useState(0);
  
    return (
      <>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
        <div className={`container ${sidebar?"" : "large-container"}`}>
          <Feed category={category} searchQuery={searchQuery}/>
        </div>
      </>
    )
 })

  export default Home
  
  