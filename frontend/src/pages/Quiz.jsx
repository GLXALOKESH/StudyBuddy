import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlus, FaTrash, FaChartPie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const quizzes = [
  { id: 1, title: 'JavaScript Basics Quiz', subject: 'JavaScript', note: 'JS Notes', attempts: 3 },
  { id: 2, title: 'React Components Quiz', subject: 'React', note: 'React Guide', attempts: 2 },
];

export default function QuizDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Your Quizzes</h1>
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center">
            <FaPlus className="mr-2" /> Create Quiz
          </Button>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="relative shadow-lg">
              <CardContent className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-indigo-600">{quiz.title}</h2>
                <p className="text-sm text-gray-600">Subject: {quiz.subject}</p>
                <p className="text-sm text-gray-600">From: {quiz.note}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="flex-1"
                  >
                    Attempt
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => console.log('Delete quiz', quiz.id)}
                    className="flex items-center justify-center"
                  >
                    <FaTrash className="text-black" />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/quiz/${quiz.id}/analytics`)}
                    className="flex items-center justify-center"
                  >
                    <FaChartPie />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Quiz Modal (simplified placeholder) */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">

          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50">
              <h2 className="text-xl font-bold mb-4">Create Quiz</h2>
              <select className="w-full mb-3 border rounded p-2">
                <option>Select Subject</option>
                <option>JavaScript</option>
                <option>React</option>
              </select>
              <select className="w-full mb-3 border rounded p-2">
                <option>Select Notes</option>
                <option>JS Notes</option>
                <option>React Guide</option>
              </select>
              <div className="flex justify-end space-x-2">
                          <Button className="cursor-pointer" variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                          <Button className="cursor-pointer" onClick={() => setShowCreateModal(false)}>Create</Button>
              </div>
              
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
