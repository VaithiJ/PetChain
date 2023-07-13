import React, { useEffect, useState } from "react";
import "./Sellitem.css";
import NavBar from "../../Reusables/SellerBar/SellerBar.js";
import jwt_decode from "jwt-decode";
import axios from "../../../url.js";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Autocomplete } from '@googlemaps/react-wrapper';
import { Carousel } from "../../Reusables/Carousel.js";


const Sellitem = () => {
  const [daata, setDaata] = useState([]);
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
 const [_id, setId] = useState();

    const [cookies, setCookie, removeCookie] = useCookies([
    "user_token",
    "name",
  ]);
  const tokenn = jwt_decode(cookies.user_token);
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/sellPets",
        {
          category,
          gender,
          breed,
          owner,
          price,
          location,
          name,
          age,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      const fetchData = async () => {
        try {
          const response = await axios.get("/allPets");
          console.log(response.data);
      
          // Filter the pets based on owner name
          const filteredPets = response.data.pets.filter(
            (pet) => pet.owner === tokenn.name
          );
      
          console.log(filteredPets);
      
          // Sort the filtered pets array based on createdAt property in descending order
          const sortedPets = filteredPets.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
      
          // Get the last added pet from the sorted and filtered pets array
          const lastAddedPet = sortedPets.length > 0 ? sortedPets[0] : null;
      
          console.log(lastAddedPet);
      
          setDaata(lastAddedPet ? [lastAddedPet] : []);
          setId(lastAddedPet ? lastAddedPet._id : null);
          console.log(lastAddedPet._id)

        } catch (error) {
          console.log(error);
        }
      };
      
      fetchData();
      
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
    useEffect(()=>{

      setOwner(tokenn.name)

  },[])
  useEffect(() => {
    if (_id) {
      navigate(`/addimage/${_id}`);
    }
  }, [_id, navigate]);
  
 

  return (
    <div className="kkkk">
      <NavBar />
      <div style={{display:"flex", flexDirection:"row"}}>
      <Carousel /> 
      <div
        className="description show"
        id="sssd"
        style={{ marginTop: "150px", marginLeft: "-100px" }}
      >
        
        <h1 className="sdsd" style={{ marginLeft: "-00px" }}>Add your Pet</h1>
        <div className="det">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{width:"500px", marginLeft:"50px"}}>
              <label htmlFor="category" style={{color:"black"}}>Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="name" style={{color:"black"}}>Name:</label>
              <input
                type="text"
                id="name"
                name="nameee"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="breed" style={{color:"black"}}>Breed:</label>
              <input
                type="text"
                id="breed"
                name="breeed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="age" style={{color:"black"}}>Life Stage:</label>
              <select
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="0">Select Value</option>
                <option value="puppy" style={{color:"black"}}>Puppy/Kitten/Baby</option>
                <option value="adult"style={{color:"black"}}>Adult</option>
                <option value="senior" style={{color:"black"}}>Senior</option>
              </select>
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="location"style={{color:"black"}}>Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="gender" style={{color:"black"}}>Gender:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{color:"black"}}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{color:"black", marginLeft:"-10px",}}
                  />{" "}
                  Female
                </label>
              </div>
            </div>
            <div className="form-group" style={{width:"500px",marginLeft:"50px"}}>
              <label htmlFor="price" style={{color:"black"}}>Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <br />
            <div style={{ marginLeft: "80px" }}>
              <button
                className="option2-button"
                type="submit"
                style={{ marginLeft: "170px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sellitem;
