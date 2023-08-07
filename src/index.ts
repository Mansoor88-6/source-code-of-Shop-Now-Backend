import express, { Application } from "express"
require("../src/config/dbconnections")



import * as Server from "../src/config/express"

const app: Application = express()
const port = 3000

Server.App(app)





app.listen(port,()=>{
    console.log("server running on PORT, 3000")
})


