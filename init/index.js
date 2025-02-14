const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing  = require("../models/listing.js");

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