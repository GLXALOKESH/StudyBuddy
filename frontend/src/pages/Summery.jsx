import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaFolder, FaArrowLeft, FaDownload, FaTrash, FaPlus } from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";
import axios from "axios";

const url = "http://localhost:3000";

const SummaryPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    summaryName: "",
    selectedSubject: "",
    newSubject: "",
  });

  const convertToDownloadableUrl = (url) => {
    const i = url.indexOf("/upload/");
    return i === -1 ? url : url.slice(0, i + 8) + "fl_attachment/" + url.slice(i + 8);
  };

  useEffect(() => {
    axios.post(`${url}/api/v1/users/get-subjects`, {}, { withCredentials: true })
      .then(res => {
        if (res.data.success) setSubjects(res.data.data);
      }).catch(err => console.error("Subject fetch error:", err));
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      axios.post(`${url}/api/v1/users/get-summaries`, { subject: selectedSubject }, { withCredentials: true })
        .then(res => setSummaries(res.data.data))
        .catch(err => console.error("Summary fetch error:", err));
    }
  }, [selectedSubject]);

  const handleSummaryDelete = async (id) => {
    await axios.post(`${url}/api/v1/users/delete-summary`, { summaryId: id }, { withCredentials: true });
    setSummaries(prev => prev.filter(s => s._id !== id));
  };

  const handleUpload = async () => {
    const form = new FormData();
    form.append("file", formData.file);
    form.append("summaryName", formData.summaryName);
    form.append("subject", formData.selectedSubject || formData.newSubject);
    const res = await axios.post(`${url}/api/v1/users/upload-summary`, form, { withCredentials: true });
    setShowUploadModal(false);
    if (selectedSubject) setSelectedSubject(null); // refresh view
  };

  const renderFolders = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {subjects.map((subj, i) => (
        <Card key={i} onClick={() => setSelectedSubject(subj)} className="cursor-pointer hover:shadow-md">
          <CardContent className="flex justify-between p-6 items-center">
            <div className="flex items-center space-x-4">
              <FaFolder className="text-4xl text-indigo-600" />
              <span className="font-semibold text-lg">{subj}</span>
            </div>
            <FaTrash className="text-indigo-600 cursor-pointer"
              onClick={e => { e.stopPropagation(); handleSummaryDelete(subj); }} />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSummaries = () => (
    <div>
      <Button variant="ghost" onClick={() => setSelectedSubject(null)} className="mb-4 flex items-center text-indigo-600">
        <FaArrowLeft className="mr-2" /> Back to Folders
      </Button>

      <h2 className="text-2xl font-bold text-gray-700 mb-6">{selectedSubject} Summaries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {summaries.map((file, index) => (
          <Card key={index} className="p-4">
            <CardContent>
              <p className="font-semibold mb-2">{file.summaryName}</p>
              <p className="text-sm text-gray-500 mb-3">Subject: {file.subject}</p>
              <div className="flex justify-between">
                <a href={convertToDownloadableUrl(file.fileUrl)} download className="text-indigo-600 hover:underline flex items-center">
                  <FaDownload className="mr-2" /> Download
                </a>
                <FaTrash onClick={() => handleSummaryDelete(file._id)} className="text-indigo-600 cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Your Summaries</h1>
          <Button onClick={() => setShowUploadModal(true)} className="flex items-center">
            <FaPlus className="mr-2" /> New Summary
          </Button>
        </div>

        {selectedSubject ? renderSummaries() : renderFolders()}

        {showUploadModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div  className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-[40]"></div>
            <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] space-y-4 shadow-lg z-[50]">
              <h2 className="text-xl font-semibold mb-4">Upload New Summary</h2>
              <input type="text" placeholder="Summary Name" value={formData.summaryName} onChange={e => setFormData({ ...formData, summaryName: e.target.value })} className="w-full border rounded p-2" />
              <select className="w-full border p-2 rounded" onChange={e => setFormData({ ...formData, selectedSubject: e.target.value })}>
                <option value="">Select Subject</option>
                {subjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
              <input type="text" placeholder="Or Create New Subject" value={formData.newSubject} onChange={e => setFormData({ ...formData, newSubject: e.target.value })} className="w-full border p-2 rounded" />
              <input type="file" onChange={e => setFormData({ ...formData, file: e.target.files[0] })} className="w-full" />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button>
                <Button onClick={handleUpload}>Summarize</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SummaryPage;
