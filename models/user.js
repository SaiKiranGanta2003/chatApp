import { name } from "ejs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    nickName:{
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique :true
    },
    password : {
        type : String,
        required:true
    }

},{timestamps:true})

export default mongoose.model("users",userSchema)