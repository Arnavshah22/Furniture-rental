import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,

}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))


//secured routes
import userRouter from "./routes/userRoute.js"
import paymentRouter from "./routes/paymentRoute.js"


app.use("/api/v1/users",userRouter)
app.use("/api",paymentRouter);



export {app}
