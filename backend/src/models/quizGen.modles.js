const QuizSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    score: Number,
    takenAt: Date
  });
  
  const QuestionSchema = new mongoose.Schema({
    type: { type: String, enum: ['mcq', 'truefalse', 'fill'] },
    questionText: String,
    options: [String],
    correctAnswer: String,
    explanation: String
  });
  