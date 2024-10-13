import dotenv from 'dotenv'
import connectDB from './src/db/index.js'
import { app } from "./src/app.js"
import Razorpay from 'razorpay'

dotenv.config({
    path:'./env'
})

export const instance =new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET,  
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed !!! ",err);
})