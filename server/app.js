import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import expressFileUpload from "express-fileupload";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccount } from "./services/removeUnverifiedAccount.js";


export const app=express();

config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],  //write the url with which you want to connect here we used the url defing in FRONTEND_URL variable
    methods :["GET", "POST", "PUT", "DELETE"],  //write the methods which you will be using
    credentials: true,
})
);
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressFileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/book",bookRouter);
app.use("/api/v1/borrow",borrowRouter);
app.use("/api/v1/user",userRouter);

notifyUsers();

removeUnverifiedAccount;

connectDB();

app.use(errorMiddleware) 