import express from "express";
import userController from "../controllers/userController.js";


const userRoutes = express.Router();

userRoutes.get("/getAllUsers",userController.getAllUsers);
userRoutes.post("/addUser",userController.addUser);
userRoutes.get("/getUserData/:id",userController.getUserData)
userRoutes.post("/login",userController.login);

export default userRoutes;