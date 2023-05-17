
import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import morgan from 'morgan'



//dotenv config
dotenv.config()
import MongoConnect from "./configs/db";

//mongodb connection
MongoConnect()


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev')) // It will show all the log details in console




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`);
})