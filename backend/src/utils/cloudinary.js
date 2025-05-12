import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { DOTENV_PATH } from "../constants.js";
import { log } from "console";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null
        //upload file on cloudnary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return responce


    }catch(error){
        console.error("Upload error:", error);

        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (publicId) =>{
    try{
        console.log("Deleting from Cloudinary:", publicId);
        
        if(!publicId) {
            console.log("No public id provided");
            return null
        }
        const responce = await cloudinary.uploader.destroy(publicId, { invalidate: true })
        console.log("Cloudinary delete response:", responce);

        if (responce.result === 'not found') {
            console.error(`Cloudinary: Public ID ${publicId} not found`);
            throw new Error(`Cloudinary: Public ID ${publicId} not found`);
        }
        
        return responce
    } catch (error) {
        console.error("Cloudinary delete error:", error.message, error.http_code);
        throw new Error(`Cloudinary delete error: ${error.message} ${error.http_code}`);
    }
}



export {uploadOnCloudinary, deleteFromCloudinary}



// .upload(localFilePath,{
//     resource_type:"auto",
//     // timeout: 30000
    
// })

// .upload_stream((error,res)=>console.log(error,res)).end(imageBuffer)
        // console.log("Uploaded successfully:", responce);
