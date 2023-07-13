import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { AiOutlineEnvironment, AiOutlineHeart } from "react-icons/ai";
import qr from "../../Images/paw.png";
import NavBar from "../../Reusables/NavBar/NavBar";
import SellerBar from "../../Reusables/SellerBar/SellerBar";
import goldy from "../../Images/goldy.jpg";
import axios from "../../../url.js";
import { useParams } from "react-router-dom";

const SellerDescription = (props) => {
  const [daata, setDaata] = useState([]);

  const addd = () => {
    console.log(daata);
  };

  const { _id } = useParams();
  console.log(_id, "asadaasdasd");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <SellerBar/>
      <div className="attai">
        <img className="monster" style={{marginLeft:"350px"}} src={daata.imageUrl} alt="" />

        <div className="detailsbox" style={{marginTop:"170px"}}>
          <div className="details show">
            <div className="det">
              <div className="category">
                <span className="category-label">Name:</span>
                <span className="category-value">{daata.name}</span>
              </div>
              <div className="category">
                <span className="category-label">Breed:</span>
                <span className="category-value">{daata.breed}</span>
              </div>
              <div className="category">
                <span className="category-label">Gender:</span>
                <span className="category-value">{daata.gender}</span>
              </div>
              <div className="category">
                <span className="category-label">Category:</span>
                <span className="category-value">{daata.category}</span>
              </div>
              <div className="category">
                <span className="category-label">Life Stage:</span>
                <span className="category-value">{daata.age}</span>
              </div>
           
              <div className="category">
                <span className="category-label">Price:</span>
                <span className="category-value">{daata.price}</span>
              </div>
              <div className="category">
                <span className="category-label">Location:</span>
                <span className="category-value">{daata.location}</span>
              </div>
              <div className="category">
                <span className="category-label">Id:</span>
                <span className="category-value">{daata && daata._id && daata._id.slice(-5)}</span>
              </div>
              <div className="category">
                <span className="category-label">Verification Status:</span>
                <span className="category-value" style={{color:"red"}}>{daata.verifyStatus}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <img className="pathukaapu" src={qr} /> */}
      </div>
    </div>
  );
};

export default SellerDescription;
