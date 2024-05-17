import mongoose from "mongoose";
import { config } from "./config";

const connectDb = async()=>{
    try{
        mongoose.connection.on("connected", ()=>{
            console.log("MongoDB connected succefully");
          })
        
          mongoose.connection.on("error", (err)=>{
            console.log("Error in connceting database", err)
          })
  await  mongoose.connect(config.dataBaseUrl as string)
 
    } catch(Error){
        console.log("Faild to conncet to database", Error);
        process.exit(1);
    }
}

export default connectDb;