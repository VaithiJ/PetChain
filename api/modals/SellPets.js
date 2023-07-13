import mongoose from "mongoose";
import  Schema  from "mongoose";

const SellPets = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    age:{
        type : String,
    },
    owner:{
        type : String,
        required : true,
    },
    category:{
        type : String,
        required : true,
    },
    breed:{
        type : String,
        required : true,
    },
    gender:{
        type : String,
        required : true,
    },
    price:{
        type: String,
        default: 0,
    },
    location:{
        type: String,
        required : true,
    },
    isWishlisted:{
        type:String,
        default:"not wishlisted"
    },
    isAddedtocart:{
        type:String,
        default:"not added"
    },
    verifyStatus:{
        type: String,
        required : true,
        default: "not verified"
    },
    imageUploaded:{
        type: String,
        default: "not uploaded"
    },
    imageUrl:{
        type:String,
        default:""
    }

    

},{timestamps:true})


export default mongoose.model("Sell", SellPets)