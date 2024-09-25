import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setsidebar, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  const handleSearchSubmit = () => {
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm); 
    }
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          onClick={() => setsidebar((prev) => (prev === false ? true : false))}
          src={menu_icon}
          className="menu-icon"
          alt=""
        />
        <Link to="/">
          <img src={logo} className="logo-icon" alt="" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()} // Handle Enter key
          />
          <img
            src={search_icon}
            alt="Search"
            onClick={handleSearchSubmit}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className="user-icon" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
