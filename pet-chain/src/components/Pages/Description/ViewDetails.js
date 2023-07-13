import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { AiOutlineEnvironment, AiOutlineHeart } from "react-icons/ai";
import qr from "../../Images/paw.png";
import NavBar from "../../Reusables/NavBar/NavBar";
import goldy from "../../Images/goldy.jpg";
import axios from "../../../url.js";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import QRCode from "qrcode.react";
import sadcat from "../../Images/sadcat.png"

const Viewdetails = (props) => {
  const navigate = useNavigate();
  const [daata, setDaata] = useState([]);
  const [isAddedtocart, setAddtoCart] = useState({});
  const [status, setStatus] = useState("");
  const [showQRCodeDetails, setShowQRCodeDetails] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [isWishListed, setWishList] = useState(false); // Changed the initial state to false
  const [verifyStatus, setVerifyStatus] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const addd = () => {
    console.log(daata);
  };
  const { _id } = useParams();
  const stringId = String(_id); 

  console.log(_id, "asadaasdasd");
  const addtowish = async () => {
    try {
      console.log(stringId);
      const response = await axios.get(`/wishlist/${stringId}`);
      console.log(response.data.wishlist);
      setWishList(true); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdoptNow = async () => {
    if (!cookies.user_token) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to buy",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
      return;
    }
  
    const tokenn = jwt_decode(cookies.user_token);
  
    if (tokenn.role === "buyer") {
      try {
        console.log(_id);
        navigate("/adoptionapplication");
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        title: "Invalid User",
        text: "You need to be a buyer to proceed",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/seller");
      });
    }
  };
  
  const handleBuyNow = async () => {
    try {
      const tokenn = jwt_decode(cookies.user_token);

      if (tokenn.role === "buyer") {
        console.log(_id);
        const response = await axios.get(`/addtocart/${_id}`);
        console.log(response.data.cart);

        setAddtoCart(response.data.cart);
        navigate("/cart");
      } else {
        Swal.fire({
          title: "Please Login",
          text: "You need to login to buy ",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to buy ",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
        setVerifyStatus(response.data.user.verifyStatus); // Set the verifyStatus state based on the fetched data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleQRCodeClick = () => {
    const qrValue = `http://localhost:8080/trace/${_id}`; // Replace with your trace page URL
    window.open(qrValue, "_blank");
  };
  
  return (
    <div>
      <NavBar />
      <div className="attai">
        <img className="monster" src={daata.imageUrl} alt="" />
        <div className="detailsbox">
          <h4 className="tncs">{daata.name}</h4>
          <div className="factory">
            {daata && daata.gender && (
              <p className="pbreed">
                {daata.breed}, {daata.gender.charAt(0).toUpperCase() + daata.gender.slice(1)}
              </p>
            )}
          </div>
          <div className="idam">
            <div className="land">
              <AiOutlineEnvironment className="signified" />
              {daata && daata.location && (
                <p className="pdaata">
                  {daata.location.charAt(0).toUpperCase() + daata.location.slice(1)}
                </p>
              )}
            </div>
            <p className="kaasu">₹{daata.price}</p>
            <p className="toomuch" style={{position:"relative", left:"500px", height:"400px", fontFamily:"Nunito"}}> <p>QR code</p>
  {verifyStatus === "verified" ? (
    <div className="qrcode-container">
      <QRCode className="qrrr" onClick={handleQRCodeClick} value={`http://localhost:8080/trace/${_id}`} size={250} />
      <p>Scan QR Code for more details</p>
    </div>
  ) : (
    <>
      <img style={{width:"250px", position:"relative"}} src={sadcat}/>
      <p style={{position:"relative", top:"-30px"}}>Sorry!, It's not yet verified</p>

    </>
  )}
</p>


          </div>
          <div className="pathukaapu">
          

          </div>
          <div className="diffBB">
            {daata.price == 0 ? (
              <button className="valthukal" style={{position:"relative", left:"-100px"}} onClick={handleAdoptNow}>
                Adopt
              </button>
            ) : (
              <>
                {!isWishListed ? (
                  <button className="valthukal" onClick={addtowish}>
                    <AiOutlineHeart />
                    Add to Wishlist
                  </button>
                ) : (
                  <button
                    className="valthukal"
                    style={{ backgroundColor: "grey" }}
                    disabled
                  >
                    Added to Wishlist
                  </button>
                )}
                <button className="vaangu" onClick={handleBuyNow}>
                  Add to Cart
                </button>
              </>
            )}
          </div>
          <div className="tommy">
            <p className="whole">Pet Overview</p>
            <br/>
            <div className="tharavu">
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Name:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">{daata.name}</span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Breed:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">{daata.breed}</span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Gender:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">{daata.gender}</span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Life Stage:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">{daata.age}</span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Owner: </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">{daata.owner}</span>
                </div>
              </div>

              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Price :</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">₹{daata.price}</span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Location:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">{daata.location}</span>
                </div>
                
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Mobile:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">6383794821</span>
                </div>
                
              </div>
            </div>
          </div>
          <br/>
          <br/>
        </div>
        
      </div>
    </div>
  );
};

export default Viewdetails;
