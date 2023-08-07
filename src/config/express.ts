import express, { Application } from "express";

import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"

//middlewares
import { errMiddleware } from "../middleware/errorhandler";


//routes

import user from "../routes/user"
import product from "../routes/product"
import order from "../routes/order"


dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRETKEY
})

export const App = (app : Application): void=>{
    
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use('/uploads',express.static('uploads'))

    app.use("/api",
     user,
     product,
     order)

    app.use(errMiddleware)

    app.use((req,res,next)=>{
        next(Error("Endpoint not found"))
    })

    //timeouts for handling slow requests, it will throw an error if a request will take more than 5 seconds.
    app.use((req,res)=>{
        req.setTimeout(5000)
        res.setTimeout(5000)
    })


}