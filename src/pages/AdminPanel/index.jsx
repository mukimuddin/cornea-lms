import { useState } from 'react';

function AdminPanel() {
  const [controllers, setControllers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Moderator' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Manager' },
  ]);

  const [newController, setNewController] = useState({ name: '', email: '', role: '' });

  const handleAddController = () => {
    if (!newController.name || !newController.email || !newController.role) {
      alert('Please fill in all fields');
      return;
    }

    setControllers((prev) => [
      ...prev,
      { id: prev.length + 1, ...newController },
    ]);
    setNewController({ name: '', email: '', role: '' });
  };

  const handleRemoveController = (id) => {
    setControllers((prev) => prev.filter((controller) => controller.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Controller</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newController.name}
            onChange={(e) => setNewController({ ...newController, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={newController.email}
            onChange={(e) => setNewController({ ...newController, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            value={newController.role}
            onChange={(e) => setNewController({ ...newController, role: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="Moderator">Moderator</option>
            <option value="Manager">Manager</option>
          </select>
          <button
            onClick={handleAddController}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Add Controller
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Controllers</h2>
        <ul className="space-y-4">
          {controllers.map((controller) => (
            <li key={controller.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">{controller.name}</h3>
              <p className="text-gray-600">Email: {controller.email}</p>
              <p className="text-gray-600">Role: {controller.role}</p>
              <button
                onClick={() => handleRemoveController(controller.id)}
                className="mt-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Remove Now
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
