import Order from "../../model/order";
import { RequestHandler } from "express";


interface UserInput {
    userId: string
    productId: string
    quantity: number
    totalAmount: number
    orderDate: Date

  }

export const saveOrder: RequestHandler = async (req,res,next) => {
    try {
        
        const{userId, productId,quantity,totalAmount,orderDate} = req.body
        
        const product = await Order.create({
            userId, 
            productId,
            quantity,
            totalAmount,
            orderDate
            })
            res.status(201).json(product)
    } catch (error) {
        next(error)
        
    }
}

export const getOrder : RequestHandler = async (req,res,next) =>{
    const id = req.params.id
   try{
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json("Order not found")
    }
    res.json(order)
   }
   catch(error){
    next(error)
   }
}

export const updateOrderFully: RequestHandler<{id:string},unknown,UserInput,unknown> = async (req,res,next) => {
    try {
        const id = req.params.id
        const{userId, productId,quantity,totalAmount,orderDate} = req.body
        
        const order = await Order.findByIdAndUpdate(id,{
            userId, 
            productId,
            quantity,
            totalAmount,
            orderDate
        },{new:true})
        res.status(201).json(order)


    } catch (error) {
        next(error)      
    }
}

export const delOrder : RequestHandler = async (req,res,next) =>{
    const id = req.params.id
   try{
    const user = await Order.findByIdAndDelete(id)
    if(!user){
        return res.status(404).json("User not found")
    }
    res.status(200).json({message: `Order with id ${id} is successfully deleted`})
   }
   catch(error){
    next(error)
   }
}