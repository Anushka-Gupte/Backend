import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

 //Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloudinary Config:", {
    cloud_name: cloudinary.config().cloud_name,
    api_key: cloudinary.config().api_key,
    secret: cloudinary.config().api_secret ? "✅ loaded" : "❌ missing"
  });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload file on clooudinay
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("file is uplaoded on cloudinary",response.url)
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response
    } catch(error) {
        console.error("Cloudinary Error Details:", error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        //remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

export {uploadOnCloudinary}