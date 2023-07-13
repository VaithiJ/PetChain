import SellPets from "../modals/SellPets.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const sellPets = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const {name,owner,breed,category,price,gender,location, age, } = req.body;
   
  if (!name || !gender  || !price || !location || !category || !owner || !breed || !age ) {
    return res
      .status(400)
      .json({ message: "All the fields must be filled" });
  }

  const newPet = new SellPets({ name, gender, owner, price, location, category,breed, age});

 

 
    const savedPet = await newPet.save();
    console.log("Pet added");
    res.status(200).json(savedPet);
   
    
  } catch (err) {
    next(err);
  }
};
