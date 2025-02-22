import mongoose from "mongoose";
import messageSchema from "../models/message.js";

const addMessage = async (req, res) => {
  try {
    console.log(req.body);
    const {message,userId,userName} = req.body;

    if(!message || !userId || !userName){
        return res.status(404).json({message : "Required fields are missing"})
    }

    const messageData = new messageSchema({
        message , userId,userName
    })

    await messageData.save()

    res.status(200).json({message : "Message send Successfully"});

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in Message sending" });
  }
};

const getAllMessages = async(req,res)=>{
    try{
        const data = await messageSchema.find();

        if(data.length == 0){
            return res.status(200).json({message : "No Messages Founds"});
        }

        return res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Fecthing Data Failed"})
    }
}


const deleteMessage = async (req, res) => {
    try {
      const { id } = req.body;  // Destructuring id correctly
      const data = await messageSchema.findOneAndDelete({ _id: id }); // Fixing reference to _id
  
      if (!data) {
        return res.status(404).json({ message: "Message Not Found" }); // Handling case when no message is found
      }
  
      res.status(200).json({ message: "Message Deleted Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error in Message Deletion" }); // Using 500 for server errors
    }
  };
  

export default { addMessage, deleteMessage, getAllMessages };
