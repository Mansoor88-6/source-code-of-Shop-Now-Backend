import express from "express"
import * as orderController from "../controller/order/order"


const route = express.Router()

route.post("/order", orderController.saveOrder);  
  
route.get("/order/:id",orderController.getOrder)
route.put("/order/:id",orderController.updateOrderFully)
route.delete("/order/:id",orderController.delOrder)

export default route