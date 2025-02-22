import express from "express";
import messageController from "../controllers/messageController.js";


const messageRoutes = express.Router();

messageRoutes.delete("/deleteMessage",messageController.deleteMessage);
messageRoutes.get("/getAllMessages",messageController.getAllMessages);
messageRoutes.post("/addMessage",messageController.addMessage);

export default messageRoutes;