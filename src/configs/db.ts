// import dotenv from "dotenv"
// dotenv.config()


import mongoose from "mongoose";

const DB = process.env.DATABASE! ;


const MongoConnect = () =>{
    mongoose
    .connect(DB)
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log("Connection is not success");
        console.log(err);
    });
}

export default MongoConnect;