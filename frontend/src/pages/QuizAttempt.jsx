import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Circle } from "lucide-react";

// Sample data (replace with dynamic quiz data)
const sampleQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinking Text Modules Layout",
    ],
    correct: 1,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Netscape", "Microsoft", "Sun Microsystems"],
    correct: 1,
  },
];

export default function QuizAttemptPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const currentQuestion = sampleQuestions[currentIndex];
  const totalQuestions = sampleQuestions.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
  };

  const handleSubmit = () => {
    // Navigate to results or analytics page
    alert("Quiz submitted!");
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header with progress and timer */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">🧪 Quiz Attempt</h2>
          <div className="flex items-center gap-4">
            <Progress
              value={(currentIndex / totalQuestions) * 100}
              className="w-40"
            />
            <div className="flex items-center text-gray-700">
              <Circle className="w-4 h-4 mr-1 text-red-500 animate-pulse" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Question card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">
            Q{currentIndex + 1}. {currentQuestion.question}
          </h3>
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`p-3 border rounded-lg cursor-pointer ${
                  selectedAnswers[currentIndex] === idx
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-300"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name={`question-${currentIndex}`}
                  value={idx}
                  checked={selectedAnswers[currentIndex] === idx}
                  onChange={() => handleOptionSelect(idx)}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              variant="outline"
            >
              Previous
            </Button>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                onClick={() =>
                  setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1))
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length !== totalQuestions}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
