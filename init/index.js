require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing  = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then((res)=>{
    console.log("Connection Established");
}).catch((err)=>{
    console.log("Something Went Wrong :(");
})
async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany();
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner: "67af1a5aaa82793a1e5cbf29",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();