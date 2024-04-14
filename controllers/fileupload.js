const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req,res) => {
    try{

        const file = req.files.file;
        console.log("File upload ->", file);

        let path = __dirname + "/files/" + Date.now()+ `.${file.name.split('.').pop()}`;
        console.log("Path -> ", path);

        file.mv(path, (err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file Uploaded Successfully"
        });


    }catch(e){
        console.log("Not able to upload the file on server \n Error :",e);
    }
};

function isSupported(type, supportTypes){
    return supportTypes.includes(type);
}

async function uploadFileCloudinary(file, folder, quality){
    const options = {folder}
    console.log("Temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res)=>{
    try{

        const {name,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedType = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File type", fileType);

        if(!isSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            });
        }

        console.log("Uploading to fileUpload");
        const response = await uploadFileCloudinary(file, "fileUpload");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"File uploaded successfully on cloudinary and database"
        });

    }catch(e){
        console.log("Error : ",e);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });
    };
};

//videoUpload

exports.videoUpload = async (req,res)=>{
    try{

        const {name,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedType = ["mp4", "mkv", "mov"];

        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File type", fileType);

        if(!isSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            });
        }

        console.log("Uploading to fileUpload");
        const response = await uploadFileCloudinary(file, "fileUpload");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"File uploaded successfully on cloudinary and database"
        });

    }catch(e){
        console.log("Error : ",e);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });
    };
};

//imageSizeReducer

exports.imageSizeReducer = async (req,res)=>{
    try{

        const {name,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedType = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File type", fileType);

        if(!isSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            });
        }

        console.log("Uploading to fileUpload");
        const response = await uploadFileCloudinary(file, "fileUpload",30);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"File uploaded successfully on cloudinary and database"
        });

    }catch(e){
        console.log("Error : ",e);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });
    };
};
