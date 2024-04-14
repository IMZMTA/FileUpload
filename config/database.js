const mongoose = require("mongoose");

require("dotenv").config()

exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL,
    //     {
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true,
    // }
    )
    .then(console.log("Connect with Mongo Database"))
    .catch((e)=>{
        console.log("Error in Connection : ", e)
        process.exit(1);
    });
};