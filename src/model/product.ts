import { model, Schema, Document } from "mongoose";

interface image {
  public_id: string
  image_url: string
}

interface IProduct extends Document{
    
    name: string
    description: string
    price: number
    category: string
    image: image

}

const productSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true
      },
      image:{
        type: Object,
        required: true
      },
      category:{
        type: String,
        required : true
      }
}, {timestamps: true})

const Product = model<IProduct>("Product", productSchema )

export default Product