import React, { useState } from "react";
import "./Collection.css";
import paw from "../../Images/266770.jpg";
import dog3 from "../../Images/black.jpg";
import dog5 from "../../Images/adoptP.jpg";
import dog1 from "../../Images/goldy.jpg";
import dog2 from "../../Images/gs.jpg";
import dog4 from "../../Images/hus.jpg";
import dog6 from "../../Images/buyP.jpg";
import { Carousel } from "../Carousel";
import { Link } from "react-router-dom";
function Collection() {
  const [focusedIndex, setFocusedIndex] = useState(null);
const images = [

  paw, dog1, dog2, dog3, dog4, dog5
]
  const handleHover = (index) => {
    setFocusedIndex(index);
  };

  return (
    <div className="top-picks-section" style={{marginTop:"100px"}}>
      <h2>Collections</h2>
      <div className="Collectionpicks">
        <div className="grid-container">
          <div
            className={`card-1 large-card ${
              focusedIndex === 0 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleHover(null)}
          >
            <img className="imglargecard" src={dog2} alt="SareeCol1" />
            <h3 className="Sarecol">German Sheperd</h3>
          </div>
          <div
            className={`card-1 small-card ${
              focusedIndex === 1 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(null)}
          >
            <img className="imgsmallcard" src={paw} alt="SareeCol1" />
            <h3 className="Sarecol">Beagle</h3>
          </div>
        </div>
        <br />
        <div className="grid-container1">
          <div
            className={`card-1 small-card1 ${
              focusedIndex === 2 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(null)}
          >
            <img className="imgsmallcard" src={dog5} alt="SareeCol1" />
            <h3 className="Sarecol">Kitten</h3>
          </div>
          <div
            className={`card-1 small-card2 ${
              focusedIndex === 3 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(null)}
          >
            <img className="imgsmallcard" src={dog3} alt="SareeCol1" />
            <h3 className="Sarecol">Retriever</h3>
          </div>
          <div
            className={`card-1 medium-card1 ${
              focusedIndex === 4 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(4)}
            onMouseLeave={() => handleHover(null)}
          >
            <img className="imgsmallcard" src={dog4} alt="SareeCol1" />
            <h3 className="Sarecol">Husky</h3>
          </div>
        </div>
      </div>
      <br />
      <br />

      <button className="viewallbut">
        <Link to="/marketplace">
        <p>View All</p>
        </Link>
        <svg
          stroke-width="4"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
  </div>
  );
}

export default Collection;
