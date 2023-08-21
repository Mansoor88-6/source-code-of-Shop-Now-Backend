import { model, Schema, Document } from "mongoose";

interface IOrder extends Document{
    
    userId: string
    productId: string
    quantity: number
    totalAmount: number
    orderDate: Date

}

const orderSchema = new Schema({
      userId: {
        type: String,
        required: true
      },
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true
      },
      totalAmount:{
        type: Number,
        required: true
      },
      orderDate:{
        type: Date,
        required : true,
        default: Date.now
      }
}, {timestamps: true})

const Order = model<IOrder>("Order", orderSchema )

export default Order