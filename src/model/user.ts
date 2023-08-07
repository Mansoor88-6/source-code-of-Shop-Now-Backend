import { model, Schema, Document } from "mongoose";

interface IUser extends Document{
    
    name: string;
    email: string;
    password: string;
    shippingAddress?: string

}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      shippingAddress:{
        type: String
      }
}, {timestamps: true})

const User = model<IUser>("User", userSchema)

export default User