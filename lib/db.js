import mongoose from "mongoose";

const connectdb = async ()=>{
 if(mongoose.connection.readyState >= 1){
    return;
 }   
 await mongoose.connect(process.env.MONGO_URI);
 console.log("Connected to MongoDb")
}


export default connectdb;