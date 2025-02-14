require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing  = require("../models/listing.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})

store.on("error",(err)=>{
    console.log("Error in Mongo Session store ",err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then((res)=>{
    console.log("Connection Established");
}).catch((err)=>{
    console.log("Something Went Wrong :(");
});

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner: "67937dd9ecab8ff9d34eeb86",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();