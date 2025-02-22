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

const editMessage = async (req, res) => {
  try {
    const { id, message } = req.body;

    if (!id || !message) {
      return res.status(400).json({ message: "ID and message are required" });
    }

    const data = await messageSchema.findOneAndUpdate(
      { _id: id },
      { $set: { message } },
      { new: true } // Ensures the updated document is returned
    );

    if (!data) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({ message: "Updated Successfully", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in edit", error: err.message });
  }
};

const getMessageData = async (req, res) => {
  try {
    const id = req.params.id; // Fixed the incorrect `req.param.id`

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const data = await messageSchema.findOne({ _id: id }); // Fixed incorrect function call

    if (!data) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in getting the message data", error: err.message });
  }
};


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
  

export default { addMessage, deleteMessage, getAllMessages ,editMessage,getMessageData};
