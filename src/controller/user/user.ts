import { RequestHandler } from "express";
import User from "../../model/user";

interface UserInput {
    name: string;
    email: string;
    password: string;
    shippingAddress?: {
      street: string;
      city: string;
      zipCode: string;
    };
  }

export const saveUser: RequestHandler = async (req,res,next) => {
    try {
        const{name,email,password,shippingAddress} = req.body
        if(shippingAddress){
            const user = await User.create({
                name,
                email,
                password,
                shippingAddress
            })
            res.status(201).json(user)
        }
       else{
        const user = await User.create({
            name,
            email,
            password,
            
        })
        res.status(201).json(user)
       }


    } catch (error) {
        next(error)
        
    }
}

export const getUser : RequestHandler = async (req,res,next) =>{
    const id = req.params.id
   try{
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json("User not found")
    }
    res.json(user)
   }
   catch(error){
    next(error)
   }
}

export const updateUserFully: RequestHandler<{id:string},unknown,UserInput,unknown> = async (req,res,next) => {
    try {
        const id = req.params.id
        const{name,email,password,shippingAddress} = req.body
        if(shippingAddress){
            const user = await User.findByIdAndUpdate(id,{
                name,
                email,
                password,
                shippingAddress
            },{new: true})
            res.status(201).json(user)
        }
       else{
        const user = await User.findByIdAndUpdate(id,{
            name,
            email,
            password,
            
        },{new: true})
        res.status(201).json(user)
       }


    } catch (error) {
        next(error)
        
    }
}

export const delUser : RequestHandler = async (req,res,next) =>{
    const id = req.params.id
   try{
    const user = await User.findByIdAndDelete(id)
    if(!user){
        return res.status(404).json("User not found")
    }
    res.status(200).json({message: `User with id ${id} is successfully deleted`})
   }
   catch(error){
    next(error)
   }
}