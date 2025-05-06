import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaFolder, FaArrowLeft, FaDownload } from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";

const mockData = [
  {
    subject: "Physics",
    files: [
      { name: "Lecture 1 - Kinematics.pdf", url: "#" },
      { name: "Lecture 2 - Dynamics.pdf", url: "#" },
    ],
  },
  {
    subject: "Math",
    files: [
      { name: "Algebra Basics.txt", url: "#" },
    ],
  },
];

const NotesPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleBack = () => setSelectedSubject(null);

  const renderFolderView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {mockData.map((folder, index) => (
        <Card
          key={index}
          className="cursor-pointer hover:shadow-lg transition"
          onClick={() => setSelectedSubject(folder.subject)}
        >
          <CardContent className="flex items-center space-x-4 p-6">
            <FaFolder className="text-4xl text-indigo-600" />
            <span className="text-lg font-semibold">{folder.subject}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFilesView = () => {
    const subjectFolder = mockData.find((f) => f.subject === selectedSubject);

    return (
      <div>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4 flex items-center text-indigo-600"
        >
          <FaArrowLeft className="mr-2" /> Back to Folders
        </Button>

        <h2 className="text-2xl font-bold text-gray-700 mb-6">{selectedSubject} Files</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjectFolder.files.map((file, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <p className="font-semibold text-gray-800 mb-2">{file.name}</p>
                <p className="text-sm text-gray-500 mb-4">Subject: {selectedSubject}</p>
                <a
                  href={file.url}
                  download
                  className="inline-flex items-center text-indigo-600 hover:underline"
                >
                  <FaDownload className="mr-2" /> Download
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">Your Notes</h1>
        {selectedSubject ? renderFilesView() : renderFolderView()}
      </main>
    </div>
  );
};

export default NotesPage;
