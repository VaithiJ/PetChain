import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "../VerifyBar/VerifyBar.css"
import petChain from "../../Images/pc.png";
import paw from "../../Images/paw.png";
import { FaTrash } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

const SellerBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_token",
  ]);
  const navigate = useNavigate()
const logout = () =>{
  removeCookie("user_token");
navigate("/login")}

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos && currentScrollPos > 0) ||
          currentScrollPos < 30
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`nav-container ${visible ? "visible" : "hidden"}`}>
      <div className="logo">
        <Link to="/">
          <img src={petChain} alt="Your Logo" className="logo-image" />
        </Link>
      </div>
      <div className="sub-nav">
        <Link to="/seller">Home</Link>

    
      

    
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>
          <FiSearch />
        </button>
      </div>
      {/* <div className="right-icons">
        <Link onMouseEnter={openPopup}>
          <FiUser />
        </Link>
       
      </div> */}
      {isPopupOpen && (
        <div className="logpopup" style={{marginLeft:"500px"}} onMouseEnter={openPopup} onMouseLeave={closePopup}>
          <Link to="/">
          <button className="logButton" onClick={logout}>Logout</button>
          </Link>
          
        </div>
      )}
    </nav>
    
  );
};

export default SellerBar;
