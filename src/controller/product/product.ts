import Product from "../../model/product";
import { RequestHandler } from "express";
import cloudinary from "cloudinary"

interface image{
  public_id: string
}

interface UserInput {
    name: string;
    description: string
    price: number
    imageUrl: string
    category: string

  }

export const saveProduct: RequestHandler = async (req,res,next) => {
    
    try {
        if(req.file){
          
          const myCloud = await cloudinary.v2.uploader.upload(req.file.path)

          const{name,description,price,category} = req.body

          const product = await Product.create({
            name,
            description,
            price,
            category,
            image: {
              public_id: `${myCloud.public_id}`,
              image_url: `${myCloud.secure_url}`
            }
            
        })
        res.status(201).json(product)
        }
        else{
          res.status(400).json({error: "No file uploaded"})
        }
        
        
        
        
    } catch (error) {
       
        next(error)
        
    }
}

export const getProduct : RequestHandler = async (req,res,next) =>{
    const id = req.params.id
   try{
    const product = await Product.findById(id)
    if(!product){
        return res.status(404).json("Product not found")
    }
    res.json(product)
   }
   catch(error){
    next(error)
   }
}

export const getAllProducts: RequestHandler = async (req, res, next) => {
    try {
      const { category, limit } = req.query;
      const pipeline = [];
  
      // Filter by category if provided
      if (category) {
        pipeline.push({
          $match: {
            category: category
          }
        });
      }
  
      // Limit the number of products if provided
      if (limit) {
        pipeline.push({
          $limit: parseInt(String(limit))
        });
      }
  
      // Execute the aggregation pipeline if there are any pipeline stages
      if (pipeline.length > 0) {
        const products = await Product.aggregate(pipeline);
  
        if (!products || products.length === 0) {
          return res.status(404).json("Products not found");
        }
  
        return res.json(products);
      }
  
      // Send all products if no query parameters are provided
      const products = await Product.find({});
  
      if (!products || products.length === 0) {
        return res.status(404).json("Products not found");
      }
  
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
     
  

export const updateProductFully: RequestHandler<{id:string},unknown,UserInput,unknown> = async (req,res,next) => {
    try {
        const id = req.params.id
        const{name,description,price,imageUrl,category} = req.body
        const product = await Product.findByIdAndUpdate(id,{
            name,
            description,
            price,
            imageUrl,
            category
        },{new:true})
        res.status(201).json(product)


    } catch (error) {
        next(error)      
    }
}

export const delProduct : RequestHandler = async (req,res,next) =>{
    const id = req.params.id
   try{
    const user = await Product.findByIdAndDelete(id)
    if(!user){
        return res.status(404).json("User not found")
    }
    res.status(200).json({message: `Product with id ${id} is successfully deleted`})
   }
   catch(error){
    next(error)
   }
}

