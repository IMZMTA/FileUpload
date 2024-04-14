const mongoose = require("mongoose");
// In your file.js file
const transporter = require("../config/nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:String,
    tags:String,
    email:String
    
});

//post middleware mongoose
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC",doc);

        //send mail
        let info = await transporter.sendMail({
            from:`Nodemailer Node`,
            to:doc.email,
            subject:"New File Uploaded on Cloudinary",
            html:`<h2>Hello Jee</h2><p>File Uploaded View here <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });

        console.log("Info",info);

    }catch(e){
        console.log("Error :", e);
    }
});

const File = mongoose.model("file",fileSchema);
module.exports = File;