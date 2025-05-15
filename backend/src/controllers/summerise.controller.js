import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary, deleteFromCloudinary , extractPublicId } from "../utils/cloudinary.js";
import { Note } from "../models/noteUpload.models.js";
import { User } from "../models/user.models.js";
import { Summary } from "../models/summerisation.models.js";



const getSummerySubjects = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id)
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const subjects = user.summerySubjects
    if (!subjects || subjects.length === 0) {
        throw new ApiError(404, "No subjects found");
    }
    res.status(200).json(new ApiResponce(200, subjects, "subjects fetched successfully"))
})
    



export {    getSummerySubjects}