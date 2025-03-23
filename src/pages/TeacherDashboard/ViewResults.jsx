function ViewResults() {
  const results = [
    { student: 'John Doe', subject: 'Math', marks: 85, grade: 'A' },
    { student: 'Jane Smith', subject: 'Physics', marks: 78, grade: 'B+' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">View Results</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Student
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Subject
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Marks
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{result.student}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{result.subject}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{result.marks}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{result.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewResults;
