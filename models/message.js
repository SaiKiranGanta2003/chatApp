import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    message :{
        type : String,
        required:true
    },
    userName :{
        type : String,
        required:true
    }
},{timestamps : true})

export default mongoose.model('messages',messageSchema)