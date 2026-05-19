import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config({})

const databaseConnection = ()=>{
 return mongoose.connect(process.env.MONGO_URI,{
    dbName:"Netflix_Clone"
}).then(()=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    console.log("Error connecting to MongoDB",error)
})
}

export default databaseConnection