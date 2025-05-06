import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Note } from "../models/noteUpload.models.js";
import { User } from "../models/user.models.js";

const uploadNotes = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload a file");
  }

  
console.log(req.user._id);
  const result = await uploadOnCloudinary(req.file.path, "notes");
  if (!result) {
    throw new ApiError(500, "File upload failed");
  }
  const { fileName, subject } = req.body;
  if (!fileName || !subject) {
    throw new ApiError(400, "Please provide file name and subject");
  }
  console.log(result.url);
  

  const note = await Note.create({
    user: req.user._id,
    fileName,
    fileType: req.file.mimetype,
    fileUrl: result.secure_url,
    subject,
  });

  res.status(200).json(new ApiResponce(200, note, "File uploaded successfully"));
});





export { uploadNotes };
