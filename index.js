import express, { json } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();


//Connection to mongodb using mongoose 
const connect = async() =>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongodb.');
}
catch(error)
{
    throw error;
}
};


// mongoose.connection.on("disconnected", ()=>{
//     console.log("mongoDB Disconnected");
// })
//Check wether network connection is working or not
// mongoose.connection.on("connected", ()=>{
//     console.log("mongoDB connected");
// })
// app.get("/" , (req , res) =>{
//     res.send("Hello , my first request");
// })

//Middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);



//ErrorHandling MiddleWare
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something wnet wrong";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    });
})




app.listen(8080 , ()=>{
    connect();
    console.log("Connected to backend");
})

