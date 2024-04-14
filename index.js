const express=require("express");
const app=express();

require("dotenv").config()
const PORT=process.env.PORT||7000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("App is working");
});

const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp',
}));

const db = require("./config/database");
db.connectDB();

const cloudinary=require("./config/cloudinary");
cloudinary.connectWithCloudinary();

const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app.listen(PORT,()=>console.log(`App is running successfully at ${PORT}`));