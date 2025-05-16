import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary, deleteFromCloudinary , extractPublicId ,downloadFromCloudinary,extractFilenameFromUrl} from "../utils/cloudinary.js";
import { Note } from "../models/noteUpload.models.js";
import { User } from "../models/user.models.js";
import { Summary } from "../models/summerisation.models.js";
import { countwords, extractTextFromFile } from "../utils/functions.js";
import fs from "fs";
import { callGeminiTextGenAPI } from "../utils/gemini.js";
import { count } from "console";

const handleDownloadFile =  async (fileUrl) => {
    const filePath = await downloadFromCloudinary(fileUrl, extractFilenameFromUrl(fileUrl));
    return filePath;
}

const calcPercentRangeString = (min,max,org,) =>{
    const minRange = Math.floor((min/100)*org);
    const maxRange = Math.floor((max/100)*org);
    return `${minRange} to ${maxRange}`;

}

const getSummerySubjects = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    console.log(user.summerySubjects);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const subjects = user.summerySubjects
    if (!subjects || subjects.length === 0) {
        throw new ApiError(404, "No subjects found");
    }
    res.status(200).json(new ApiResponce(200, subjects, "subjects fetched successfully"))
})

const summerizeNote = asyncHandler(async (req, res) => {
//take note id and level
// download note from cloudinary
//convert it to text
// call AI API to summerize the text
// save the content the database
//save the summery id in note and user db
console.log(req.body);

const {summaryName, subject, noteId, summeryLength} = req.body;

const note = await Note.findById(noteId);
if (!note) {
    throw new ApiError(404, "Note not found");
}
const filePath = await handleDownloadFile(note.fileUrl);
if (!filePath) {
    throw new ApiError(500, "Failed to download file");
}

const text =await extractTextFromFile(filePath);
if (!text) {
    throw new ApiError(500, "Failed to extract text from file");    
}
console.log(countwords(text));
const wordCount = countwords(text);

let summerylimit = "0"
fs.unlinkSync(filePath);
switch (summeryLength) {
    case "short":
        summerylimit = calcPercentRangeString(14,15,wordCount);
        break;
    case "medium":
        summerylimit = calcPercentRangeString(22,25,wordCount);
        break;
    case "large":
        summerylimit = calcPercentRangeString(30,32,wordCount);
        break;
    default:
        throw new ApiError(400, "Invalid summary length");

        
}
console.log(summerylimit);

const prompt = `You are an academic assistant. Summarize the following content in approximately ${summerylimit} words, focusing only on key concepts, facts, and definitions.\n\nCONTENT:\n${text}`;

console.log("generating");

const summery = await callGeminiTextGenAPI(prompt);
if (!summery) {
    throw new ApiError(500, "Failed to generate summary");
}
console.log("done generating");
console.log(countwords(summery));

console.log(summery);

const summerydb = await Summary.create({

    note: noteId,
    level: summeryLength,
    fileName: summaryName,
    content: summery,
    wordCount: countwords(summery),
}) 
if (!summerydb) {
    throw new ApiError(500, "Failed to save summary");
}
const user = await User.findById(req.user._id);
if (!user) {
    throw new ApiError(404, "User not found");
}
user.summaries.push(summerydb._id);
if (!user.summerySubjects.includes(subject)) {
    user.summerySubjects.push(subject);
}
note.summaryIds.push(summerydb._id);
await user.save();
await note.save();

res.status(200).json(new ApiResponce(200, summerydb, "Summery generated Successfully"));

})





export {    getSummerySubjects,  summerizeNote}