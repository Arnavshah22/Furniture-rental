import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"

const tokenBlacklist = new Set();
const registerUser = asyncHandler(async (req, res) => {
         const {name,email,password,mobile,address}=req.body;

         
      if(
        [name,email,password,mobile,address].some((field)=>field?.trim()==="")

      ){
        throw new apiError(400,"All the fields are required")
      } 

         const user1=await User.findOne({email})
         if(user1){
            throw new apiError(409,"Email is Already In use");

         }
         const hashPassword=await bcrypt.hash(password,10);
         try {
            if(hashPassword){
               let user2=await User.create({
                  name,
                  email,
                  password:hashPassword,
                  mobile,
                  address,
               });
               if(user2){
                  res.send("User has been Created SuccessFully");
               }
               else{
                  res.send("User is Not created")
               }
            }else{
               res.send("Please change the password")
            }

         } catch (error) {
            res.send(err);
         }
});
const loginUser = asyncHandler(async (req, res) => {
   try {
       const { email, password } = req.body;

       // Email validation regex
       const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

       // Input validation
       if (!email || !password) {
           return res.status(400).json({
               success: false,
               message: "Please provide both email and password"
           });
       }

       // Email format validation
       if (!emailRegex.test(email)) {
           return res.status(400).json({
               success: false,
               message: "Invalid email format"
           });
       }

       // Find user and select necessary fields
       const user = await User.findOne({ email }).select('+password');

       // Check if user exists
       if (!user) {
           return res.status(401).json({
               success: false,
               message: "Invalid credentials"
           });
       }

       // Compare password
       const isPasswordValid = await bcrypt.compare(password, user.password);

       if (!isPasswordValid) {
           return res.status(401).json({
               success: false,
               message: "Invalid credentials"
           });
       }

       // Generate JWT token
       const token = jwt.sign(
           {
               userId: user._id,
               email: user.email
           },
           process.env.JWT_SECRET,
           { expiresIn: '24h' }
       );

       // Send successful response
       return res.status(200).json({
           success: true,
           message: "Login successful",
           token,
           user: {
               id: user._id,
               email: user.email,
               // Add other user fields you want to return
           }
       });

   } catch (error) {
       // Log error for debugging (in production environment)
       console.error('Login error:', error);

       return res.status(500).json({
           success: false,
           message: "An error occurred during login",
           error: process.env.NODE_ENV === 'development' ? error.message : undefined
       });
   }
});


const logoutUser=asyncHandler(async(req,res)=>{
   try{
      const token=req.headers.authorization?.split(' ')[1];
      if(!token){
         return res.status(401).json({
            success:false,
            message:"No token Provide"
         })


      }

      //add token to blackList
      tokenBlacklist.add(token);
      res.clearCookie('jwt');
      return res.status(200).json({
         success:true,
         message:"Logged Out SuccessFully",
      })

      
   }catch(error){
      console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout"
        });

   }
})
export {registerUser,loginUser,logoutUser}


