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
          {/* <div className="catd">

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
          </div> */}

<section className="text-gray-600 body-font"  >
  <div className="container px-5 py-24 mx-auto" style={{backgroundColor:"white"}} >
    <div className="flex flex-wrap -m-4" style={{display:"flex", flexDirection:"coloumn"}}>
      <div className="p-4 md:w-1/3" style={{backgroundColor:"white"}}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" style={{boxShadow:"0px -1px 8px -3px rgba(0,0,0,0.75)", width:"320px",height:"400px", position:"relative", left:"-80px", borderRadius:"10px"}}>
          <img
            className="lg:h-8 md:h-36 w-full object-cover object-center"
            src={check}
            alt="blog"
            style={{width:"250px", height:"250px", marginRight:"10px", borderRadius:"10px"}}

          />
          <div className="p-6" style={{marginLeft:"-130px"}}>
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"  style={{fontFamily:"Nunito", position:"relative", left:"-35px"}}>
              Verified
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3"  style={{fontFamily:"system-ui", fontSize:"20px", position:"relative", left:"10px"}}>
            Buy only verified pets
            </h1>
          
            
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3" style={{backgroundColor:"white"}}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" style={{boxShadow:"0px -1px 8px -3px rgba(0,0,0,0.75)", width:"300px",height:"400px", position:"relative", left:"-0px", borderRadius:"10px"}}>
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={petting}
            alt="blog"
            style={{width:"300px", height:"250px",marginRight:"10px", borderRadius:"10px"}}

          />
          <div className="p-6" style={{marginLeft:"-130px"}}>
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"  style={{fontFamily:"Nunito", position:"relative", left:"-25px"}}>
              Trusted
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{fontFamily:"system-ui", fontSize:"20px", position:"relative", left:"30px"}}>
            10+ Parameters Verified
            </h1>
          
           
          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3" style={{backgroundColor:"white"}}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" style={{boxShadow:"0px -1px 8px -3px rgba(0,0,0,0.75)", width:"300px",height:"400px", position:"relative", left:"80px", borderRadius:"10px"}}>
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={gold}
            alt="blog"
            style={{width:"300px", height:"250px", borderRadius:"10px"}}

          />
          <div className="p-6"  >
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{fontFamily:"Nunito", position:"relative", left:"-80px"}}>
              Examined
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{fontFamily:"system-ui", fontSize:"20px", position:"relative", left:"-30px"}}>
            All pets verified in person
            </h1>
           
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

          
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
