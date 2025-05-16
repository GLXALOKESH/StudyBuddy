import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
const extractTextFromTxt = (filePath) => {
    return fs.readFileSync(filePath, 'utf-8');
};

const extractTextFromDocx = async (filePath) => {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value; // This is the raw text
};

const extractTextFromPdf = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

const extractTextFromFile = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.txt':
            return extractTextFromTxt(filePath);
        case '.docx':
            return extractTextFromDocx(filePath);
        case '.pdf':
            return extractTextFromPdf(filePath);
        default:
            throw new Error(`Unsupported file type: ${ext}`);
    }
}

const countwords = (text) => {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

export {extractTextFromTxt,extractTextFromDocx, extractTextFromPdf, extractTextFromFile, countwords}