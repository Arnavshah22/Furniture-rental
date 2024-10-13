import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
    },  
    address: {
        type: String,
        required: true,
    },
    userid: String,

})
export default mongoose.model("User",userSchema)
