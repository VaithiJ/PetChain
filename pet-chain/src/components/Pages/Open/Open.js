import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Reusables/NavBar/NavBar.js";
import dog3 from "../../Images/ffr.jpg";
import "./Open.css";
import { Carousel } from "../../Reusables/Carousel.js";
import paw from "../../Images/paw.png";
import { FaPaw } from "react-icons/fa";
import paww from "../../Images/paww.svg";
import ScrollToTopButton from "../../Reusables/Arrow/Arrow.js";
import buyP from "../../Images/buyP.jpg";
import adoptP from "../../Images/catty.jpg";
import catGif from "../../Images/cat.gif";
import Slider from "../../Reusables/Slider/Slider.js";
import TopPicks from "../../Reusables/Carousel/TopPicks.js";
import Collection from "../../Reusables/Collections/Collection.js";
import lines from "../../Images/lines.jpg";
import Add from "../Seller/Add.js";
import sss from "../../Images/cir.svg";
import DogButton from "../../Reusables/DogButton/DogButton.js";
import AdoptButton from "../../Reusables/DogButton/AdoptButton.js";
import BuyButton from "../../Reusables/DogButton/BuyButton.js";
import axios from "../../../url.js";
import gold from "../../Images/goldver.jpg";
import check from "../../Images/check.png";
import petting from "../../Images/petting.jpg";
import ado from "../../Images/gingg.jpg";
const Open = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  // Event listener to handle scroll position
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;

    setVisible(visible);
    setPrevScrollPos(currentScrollPos);
  };
  const navigate = useNavigate();

  const buyPets = () => {
    navigate("/marketplace");
  };

  const adoptPets = () => {
    navigate("/adoption");
  };

  const sellPets = () => {
    navigate("/seller");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allPets");
        const petsData = response.data.pets;
        petsData.forEach((pet) => {
          console.log(pet.name);
        });

        const responsee = await axios.get("/images");
        const imagesData = responsee.data;
        imagesData.forEach((i) => {
          console.log(i.imageUrl);
        });

        // Match IDs and make the POST request
        const matchingIDs = petsData
          .map((pet) => pet._id)
          .filter((id) => imagesData.find((image) => image._id === id));

        matchingIDs.forEach(async (id) => {
          const matchingImage = imagesData.find((image) => image._id === id);
          try {
            await axios.post("/imageUrl", {
              imageUrl: matchingImage.imageUrl,
              ids: [id],
            });
            console.log("Image URL posted for ID:", id);
          } catch (error) {
            console.log("Error posting image URL for ID:", id, error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader">
          <img style={{ marginTop: "200px" }} src={catGif} alt="Loader" />
        </div>
      ) : (
        <>
          <NavBar visible={visible} />
          <div>
            <img className="dogImage" src={dog3} alt="Dog" />
            <div className="dogText">
              <div className="best">
                Best friend <img className="pawwww" src={paww} alt="Paw" />
                <br /> <div className="with">with</div> happy time
              </div>
            </div>
          </div>
          <div className="catch">
            Unleash the love: Where wagging tails and <br /> purrs speak louder
            than words.
          </div>
          <DogButton />
          {/* <button className="viewButton" onClick={buyPets}>
            View More <FaPaw />
          </button> */}
          <div className="puppies">Pets waiting for you</div>
          <img className="paw" src={paw} alt="Paw" />
          <img className="paw2" src={paw} alt="Paw" />
          <TopPicks /> <Collection />
          {/* <div className="adopt">
            <img className="paw3" src={paw} alt="Paw" />
            <div className="adopt1">
              <img className="adoptP" src={adoptP} alt="Adopt Pets" />{" "}
            </div>
            <ul className="desc">
              Adopt your fellow beings for their better life
            </ul> */}
          {/* <button className="viewButton1" onClick={adoptPets}>
              Adopt Pets <FaPaw />
            </button> */}
          {/* <AdoptButton/>
          </div> */}
          <br />
          <br />
          <div className="catd">

            <div className="contcard">
              <div className="verifcont">
                <img className="goldverr" src={check} />
                <p className="pst">Buy only verified pets</p>
              </div>
              <div className="verifcont">
                <img className="goldver" src={gold} />
                <p className="pstyleee">
                  <p className="twelve">10+</p>
                  Parameters Verified
                </p>
              </div>
              <div className="verifcont">
                <img className="goldver" src={petting} />

                <p className="pst" style={{ color: "brown" }}>
                  All pets verified <br /> in person
                </p>
              </div>
            </div>
          </div>
          
          <div className="buy">
            <ul className="descc">
              Buy your fellow beings for <br /> your better life
            </ul>
            <BuyButton />
            {/* <button className="viewButton2" onClick={buyPets}>
              Buy Pets <FaPaw />
            </button> */}
            <div className="buy1">
              <img className="buyP" src={buyP} alt="Buy Pets" />{" "}
            </div>
          </div>
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
};

export default Open;
