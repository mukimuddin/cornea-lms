import { useState, useEffect } from 'react';

function DailyRoutine() {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentBatch = 10; // Example: Student belongs to batch 10

  useEffect(() => {
    // Simulate fetching routine data from an API
    const fetchRoutine = async () => {
      setLoading(true);
      const mockApiResponse = {
        1: [
          { time: '08:00 AM', activity: 'Morning Assembly' },
          { time: '08:30 AM', activity: 'English Class' },
          { time: '09:30 AM', activity: 'Math Class' },
          { time: '10:30 AM', activity: 'Break' },
          { time: '11:00 AM', activity: 'Drawing Class' },
          { time: '12:00 PM', activity: 'Storytelling' },
        ],
        10: [
          { time: '08:00 AM', activity: 'Morning Assembly' },
          { time: '08:30 AM', activity: 'Physics Class' },
          { time: '09:30 AM', activity: 'Chemistry Class' },
          { time: '10:30 AM', activity: 'Break' },
          { time: '11:00 AM', activity: 'Math Class' },
          { time: '12:00 PM', activity: 'Biology Class' },
        ],
        12: [
          { time: '08:00 AM', activity: 'Morning Assembly' },
          { time: '08:30 AM', activity: 'Physics Class' },
          { time: '09:30 AM', activity: 'Chemistry Class' },
          { time: '10:30 AM', activity: 'Break' },
          { time: '11:00 AM', activity: 'Math Class' },
          { time: '12:00 PM', activity: 'Computer Science' },
        ],
      };

      // Fetch the routine for the student's batch
      const batchRoutine = mockApiResponse[studentBatch] || [];
      setRoutine(batchRoutine);
      setLoading(false);
    };

    fetchRoutine();
  }, [studentBatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Daily Routine</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Activity
              </th>
            </tr>
          </thead>
          <tbody>
            {routine.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {item.time}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {item.activity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyRoutine;
