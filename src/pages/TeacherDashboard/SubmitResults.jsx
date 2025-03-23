import { useState } from 'react';

function SubmitResults() {
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({
    studentName: '',
    subject: '',
    marks: '',
    totalMarks: '',
    grade: '',
  });

  const handleAddResult = () => {
    if (
      !newResult.studentName ||
      !newResult.subject ||
      !newResult.marks ||
      !newResult.totalMarks ||
      !newResult.grade
    ) {
      alert('Please fill in all fields');
      return;
    }

    setResults((prev) => [...prev, { ...newResult }]);
    setNewResult({ studentName: '', subject: '', marks: '', totalMarks: '', grade: '' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Submit Results</h1>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Result</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Student Name"
            value={newResult.studentName}
            onChange={(e) => setNewResult({ ...newResult, studentName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Subject"
            value={newResult.subject}
            onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Marks"
            value={newResult.marks}
            onChange={(e) => setNewResult({ ...newResult, marks: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={newResult.totalMarks}
            onChange={(e) => setNewResult({ ...newResult, totalMarks: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Grade"
            value={newResult.grade}
            onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddResult}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Add Result
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Submitted Results</h2>
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">{result.studentName}</h3>
              <p className="text-gray-600">Subject: {result.subject}</p>
              <p className="text-gray-600">
                Marks: {result.marks}/{result.totalMarks}
              </p>
              <p className="text-gray-600">Grade: {result.grade}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SubmitResults;
