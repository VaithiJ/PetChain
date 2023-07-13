import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"
import NavBar from "../../Reusables/NavBar/NavBar";
import kitty from "../../Images/speak.jpg"
import axios from "../../../url.js"
import { useNavigate } from "react-router-dom";
import preview from "../../Images/previeww.jpg"

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLocationClick = () => {
    window.open("https://maps.google.com", "_blank");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/register`, {
        name,
        mobile,
        password,
        location,
        email,
        role,
      });
      console.log("hiighji");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log("wrongyyyy");
      console.error(error);
    }

    // Validation and submit logic goes here

    // Reset the form
    setName("");
    setmobile("");
    setEmail("");
    setLocation("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  };

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
            <img className="previewwpet"  src={preview}/>
    <div className="sign-in-page">
      <NavBar/>
      <h2>Sign In</h2>
      <form className="signform" onSubmit={handleSubmit}>
        <div>
          <label className="signlab">Name:</label>
          <input className="signinp"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Role:</label>
          <select className="signsel"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div>
          <label className="signlab">Phone Number:</label>
          <input className="signinp"
            type="text"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Email:</label>
          <input className="signinp"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Location:</label>
          <input className="signinp"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Password:</label>
          <input className="signinp"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signlab">Confirm Password:</label>
          <input className="signinp"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      
        <button className="signbut" type="submit">Sign In</button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
