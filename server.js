import express from "express";
import bodyParser from "body-parser";
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js'
import dotenv from "dotenv";
import mongoose from "mongoose";
import messageSchema from "./models/message.js"
import ejs from "ejs";
import fs from 'fs';

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
app.set("view engine",'ejs');
app.use(bodyParser.json());
app.use(express.json())
app.use('/message',messageRoutes);
app.use("/user",userRoutes);

mongoose.connect(MONGO_URI).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})


app.get("/chat",async(req,res)=>{
    res.render("chat")
})

app.get('/loginPage',async(req,res)=>{
    res.render("login")
})
app.get('/signUpPage',async(req,res)=>{
    res.render("signIn")
})

app.get("/signin.jpg",async(req,res)=>{
    return res.send(fs.readFileSync('./public/signin.jpg'))
})
app.get("/moblieSIgnIn.jpg",async(req,res)=>{
    return res.send(fs.readFileSync('./public/moblieSIgnIn.jpg'))
})
app.get("/boy",async(req,res)=>{
    return res.send(fs.readFileSync('./public/boy.webp'))
})

app.get("/girl",async(req,res)=>{
    return res.send(fs.readFileSync('./public/girl.webp'))
})

app.listen(PORT,
    ()=>{
        console.log(`Server Run in ${PORT}`)
    }
)
