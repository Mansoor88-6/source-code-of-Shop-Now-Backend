import express from "express"
import * as userController from "../controller/user/user"

const route = express.Router()

route.post("/user",userController.saveUser)
route.get("/user/:id",userController.getUser)
route.put("/user/:id",userController.updateUserFully)
route.delete("/user/:id",userController.delUser)

export default route