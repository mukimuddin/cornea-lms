import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function DailyRoutine() {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacherId = 'TEACHER123'; // Example: Teacher's unique ID

  useEffect(() => {
    // Simulate fetching routine data from an API
    const fetchRoutine = async () => {
      setLoading(true);
      const mockApiResponse = {
        TEACHER123: [
          { time: '08:00 AM', activity: 'Morning Assembly' },
          { time: '09:00 AM', activity: 'Physics Class (Batch 10)' },
          { time: '10:00 AM', activity: 'Chemistry Class (Batch 12)' },
          { time: '11:00 AM', activity: 'Break' },
          { time: '11:30 AM', activity: 'Math Class (Batch 10)' },
          { time: '01:00 PM', activity: 'Staff Meeting' },
        ],
        TEACHER456: [
          { time: '08:30 AM', activity: 'English Class (Batch 1)' },
          { time: '09:30 AM', activity: 'History Class (Batch 2)' },
          { time: '10:30 AM', activity: 'Break' },
          { time: '11:00 AM', activity: 'Geography Class (Batch 3)' },
          { time: '12:30 PM', activity: 'Parent-Teacher Meeting' },
        ],
      };

      // Fetch the routine for the logged-in teacher
      const teacherRoutine = mockApiResponse[teacherId] || [];
      setRoutine(teacherRoutine);
      setLoading(false);
    };

    fetchRoutine();
  }, [teacherId]);

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
      <Outlet />
    </div>
  );
}

export default DailyRoutine;
