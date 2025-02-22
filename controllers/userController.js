import mongoose from "mongoose";
import userSchema from '../models/user.js';
import bcrypt from "bcryptjs";

const addUser = async (req, res) => {
  try {
    const { name, nickName, email, password } = req.body;
    console.log(name, nickName, email, password)
    if (!name || !nickName || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "You are already registered. Please log in." });
    }

    // 🔒 Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Save user with hashed password
    const userData = new userSchema({
      name,
      nickName,
      email,
      password: hashedPassword, // Store hashed password
    });

    await userData.save();

    return res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in Adding User" });
  }
};


const getAllUsers = async(req,res)=>{
    try{
        const data = await userSchema.find();

        if(data.length == 0){
            return res.status(404).json({message : "Users Not Founds"});
        }

        return res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Fecthing Data Failed"})
    }
}

const getUserData = async(req,res)=>{
    try{
        const id = req.params.id;

        const data = await userSchema.find({_id:id})
        if(!data){
            return res.status(404).json({message:"User Not Found"})
        }

        return res.status(200).json(data)

    }
    catch(err){
        console.log(err)
        res.status(500).json({message : "Error in getting Data"})
    }


    
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and Password required" });
      }
  
      const user = await userSchema.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      return res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Login failed" });
    }
  };
  


export default {addUser,getAllUsers,login, getUserData}