import { useState, useEffect } from 'react';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = 'STU12345'; // Example: Student's unique ID

  useEffect(() => {
    // Simulate fetching payment data from an API
    const fetchPayments = async () => {
      setLoading(true);
      const mockApiResponse = {
        STU12345: {
          history: [
            { date: '2023-01-15', amount: 5000, status: 'Paid' },
            { date: '2023-02-15', amount: 5000, status: 'Paid' },
            { date: '2023-03-15', amount: 5000, status: 'Paid' },
          ],
          pending: [
            { date: '2023-04-15', amount: 5000, status: 'Due' },
            { date: '2023-05-15', amount: 5000, status: 'Due' },
          ],
        },
      };

      // Fetch the payment data for the logged-in student
      const studentPayments = mockApiResponse[studentId] || { history: [], pending: [] };
      setPayments(studentPayments);
      setLoading(false);
    };

    fetchPayments();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderTable = (title, data) => (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">${item.amount}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    item.status === 'Paid' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payments</h1>
      {renderTable('Payment History', payments.history)}
      {renderTable('Pending Dues', payments.pending)}
    </div>
  );
}

export default Payments;
