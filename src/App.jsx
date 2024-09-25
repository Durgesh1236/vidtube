
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import {Route, Routes } from "react-router-dom"
import Home from './Pages/Home/Home'
import Video from "./Pages/Video/Video"
import { useState } from 'react'
const App = () => {

  const [sidebar, setsidebar] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (query) => {
    setSearchQuery(query); 
  };
  return (
    <div> 
      < Navbar
       setsidebar={setsidebar} 
       onSearch={handleSearch} />

      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} searchQuery={searchQuery}/>} />
        <Route path ='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App
