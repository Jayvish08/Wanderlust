require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing  = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

main().then((res)=>{
    console.log("Connection Established");
}).catch((err)=>{
    console.log("Something Went Wrong :(");
})
async function main() {
    await mongoose.connect(dbUrl);
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