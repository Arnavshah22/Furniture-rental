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

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new apiError(400, "Email is required");
    }

    if (!password) {
        throw new apiError(400, "Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid credentials");
    }

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("token", loggedInUser.generateAuthToken(), options)
        .json(new apiResponse(200, { user: loggedInUser }, "User logged in successfully"));
});



export  {registerUser,LoginUser}

