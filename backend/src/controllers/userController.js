import User from "../models/user_model.js";
import jwt from "jsonwebtoken"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser=asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation-not empty
   const {name,email,password,address}=req.body;

   if(
     [name,email,password,address].some((field)=>field?.trim()==="")

   ){
     throw new apiError(400,"All the fields are required")
   }

   const existedUser=await User.findOne(
     {
         email
     }
   )
   if(existedUser){
     throw new apiError(409,"User with email or username already exists");

   }
  
    const user=await User.create({
       name,
       email,
       password,
       address,
    })

    const createUser=await User.findById(user._id).select(
     "-password"
    )

    if(!createUser){
     throw new apiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
     new apiResponse(200, createUser, "User registered Successfully")
 )

})


export  {registerUser}

