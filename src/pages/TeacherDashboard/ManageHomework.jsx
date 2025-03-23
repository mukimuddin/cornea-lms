import { useState } from 'react';

function ManageHomework() {
  const [homework, setHomework] = useState([
    { id: 1, subject: 'Math', description: 'Solve Chapter 3 problems', dueDate: '2023-09-20' },
    { id: 2, subject: 'Physics', description: 'Prepare notes on optics', dueDate: '2023-09-22' },
  ]);

  const [newHomework, setNewHomework] = useState({ subject: '', description: '', dueDate: '' });

  const handleAddHomework = () => {
    if (!newHomework.subject || !newHomework.description || !newHomework.dueDate) {
      alert('Please fill in all fields');
      return;
    }

    setHomework((prev) => [
      ...prev,
      { id: prev.length + 1, ...newHomework },
    ]);
    setNewHomework({ subject: '', description: '', dueDate: '' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Homework</h1>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Homework</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={newHomework.subject}
            onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newHomework.description}
            onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="date"
            value={newHomework.dueDate}
            onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddHomework}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Add Homework
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Homework</h2>
        <ul className="space-y-4">
          {homework.map((item) => (
            <li key={item.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">{item.subject}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageHomework;
