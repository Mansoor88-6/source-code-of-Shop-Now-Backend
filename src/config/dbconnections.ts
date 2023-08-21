import {mongoDbUrl} from "../config/config"
import mongoose, { ConnectOptions } from "mongoose";




async function run() {
    try {
      console.log("Connecting to MongoDB...");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await mongoose.connect(mongoDbUrl!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      
      const db = mongoose.connection;
  
      db.on("connected", () => {
        console.log("MongoDB is connected");
        
      });
  
      db.on("error", (error) => {
        console.error("MongoDB connection error:", error);
      });
  
      db.on("disconnected", () => {
        console.log("MongoDB connection disconnected");
      });
  
      db.on("reconnected", () => {
        console.log("MongoDB reconnected");
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  run();
  
  

  