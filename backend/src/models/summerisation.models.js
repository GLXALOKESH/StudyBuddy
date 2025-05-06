const SummarySchema = new mongoose.Schema({
    note: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' },
    level: { type: String, enum: ['short', 'medium', 'long'], default: 'medium' },
    content: String,
    createdAt: { type: Date, default: Date.now }
  });
  