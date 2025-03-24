import { useState, useEffect } from 'react';

function Results() {
  const [results, setResults] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [loading, setLoading] = useState(true);
  const studentId = 'STU12345'; // Example: Student's unique ID

  useEffect(() => {
    // Simulate fetching results data from an API
    const fetchResults = async () => {
      setLoading(true);
      const mockApiResponse = {
        STU12345: {
          weekly: [
            { exam: 'Week 1', subject: 'Math', marks: 18, total: 20, grade: 'A' },
            { exam: 'Week 2', subject: 'Physics', marks: 15, total: 20, grade: 'B+' },
          ],
          monthly: [
            { exam: 'January', subject: 'Chemistry', marks: 78, total: 100, grade: 'B+' },
            { exam: 'February', subject: 'Biology', marks: 85, total: 100, grade: 'A' },
          ],
          yearly: [
            { exam: 'Final Exam', subject: 'Math', marks: 92, total: 100, grade: 'A+' },
            { exam: 'Final Exam', subject: 'Physics', marks: 88, total: 100, grade: 'A' },
          ],
        },
      };

      // Fetch the results for the logged-in student
      const studentResults = mockApiResponse[studentId] || { weekly: [], monthly: [], yearly: [] };
      setResults(studentResults);
      setLoading(false);
    };

    fetchResults();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderTable = (title, data) => (
    <div className="mb-4 md:mb-6">
      <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left text-gray-700 font-medium">
                Exam
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left text-gray-700 font-medium">
                Subject
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left text-gray-700 font-medium">
                Marks
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left text-gray-700 font-medium">
                Total
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left text-gray-700 font-medium">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-800">{item.exam}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-800">{item.subject}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-800">{item.marks}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-800">{item.total}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-800">{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Results</h1>
      {renderTable('Weekly Exams', results.weekly)}
      {renderTable('Monthly Exams', results.monthly)}
      {renderTable('Yearly Exams', results.yearly)}
    </div>
  );
}

export default Results;
