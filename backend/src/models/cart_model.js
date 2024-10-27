import mongoose from "mongoose";
const cartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    furniture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Furniture",
        required:true,
    }
    ,
    quantity:{
        type:Number,
    },
    price:{
        type:Number,

    }
    ,
    tenure:{
        type:Number,
    }
,
},{versionKey:false});

export default mongoose.model("Cart",cartSchema)
