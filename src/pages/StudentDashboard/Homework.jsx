import { useState, useEffect } from 'react';

function Homework() {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentBatch = 10; // Example: Student belongs to batch 10

  useEffect(() => {
    // Simulate fetching homework data from an API
    const fetchHomework = async () => {
      setLoading(true);
      const mockApiResponse = {
        1: [
          { subject: 'English', description: 'Write a short story.', dueDate: '2023-09-15' },
          { subject: 'Math', description: 'Solve 10 problems from Chapter 2.', dueDate: '2023-09-16' },
        ],
        10: [
          { subject: 'Physics', description: 'Complete the lab report on optics.', dueDate: '2023-09-15' },
          { subject: 'Chemistry', description: 'Prepare notes on chemical bonding.', dueDate: '2023-09-16' },
        ],
        12: [
          { subject: 'Math', description: 'Solve integration problems from the worksheet.', dueDate: '2023-09-15' },
          { subject: 'Computer Science', description: 'Write a program for binary search.', dueDate: '2023-09-16' },
        ],
      };

      // Fetch the homework for the student's batch
      const batchHomework = mockApiResponse[studentBatch] || [];
      setHomework(batchHomework);
      setLoading(false);
    };

    fetchHomework();
  }, [studentBatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Homework</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Subject
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {homework.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {item.subject}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {item.dueDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homework;
