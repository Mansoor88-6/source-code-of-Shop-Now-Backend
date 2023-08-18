import express, { Application } from "express"
require("../src/config/dbconnections")



import * as Server from "../src/config/express"

const app: Application = express()


Server.App(app)


const port = process.env.PORT;




app.listen(port,()=>{
    console.log("server running on PORT, 3000")
})


