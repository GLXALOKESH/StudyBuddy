const NoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: String,
    fileType: String,
    fileUrl: String,
    uploadDate: { type: Date, default: Date.now },
    previewText: String,
    summaryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Summary' }],
    flashcardGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardGroup' }
  });
  