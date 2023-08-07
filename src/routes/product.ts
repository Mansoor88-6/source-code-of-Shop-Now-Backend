import express from "express"
import * as productController from "../controller/product/product"
import { upload } from "../config/multer"
import multer from "multer"

const route = express.Router()

route.post("/product",  
(req, res, next) => {
    
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
          next(err)
      } else if (err) {
          next(err)
      }
      // Everything went fine.
      next();
  });
}, productController.saveProduct);  
  
route.get("/product",productController.getAllProducts)
route.get("/product/:id",productController.getProduct)
route.put("/product/:id",productController.updateProductFully)
route.delete("/product/:id",productController.delProduct)

export default route