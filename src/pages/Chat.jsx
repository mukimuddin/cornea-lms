import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [conversations] = useState([
    { id: 'student1', name: 'Student1', type: 'oneOnOne', unread: true },
    { id: 'teacher1', name: 'Teacher1', type: 'oneOnOne', unread: true },
    { id: 'admin1', name: 'Admin1', type: 'oneOnOne', unread: false },
    { id: 'group', name: 'Group Chat', type: 'group', unread: true },
  ]);

  const [messages, setMessages] = useState({
    student1: [
      { sender: 'You', content: 'Hi Student1!', timestamp: '09:00 AM', status: 'Delivered' },
      { sender: 'Student1', content: 'Hello!', timestamp: '09:05 AM', status: 'Read' },
    ],
    teacher1: [
      { sender: 'You', content: 'Good morning, Teacher1!', timestamp: '08:00 AM', status: 'Sent' },
      { sender: 'Teacher1', content: 'Good morning!', timestamp: '08:05 AM', status: 'Delivered' },
    ],
    admin1: [
      { sender: 'You', content: 'Hello Admin1!', timestamp: '07:00 AM', status: 'Delivered' },
      { sender: 'Admin1', content: 'Hi there!', timestamp: '07:05 AM', status: 'Read' },
    ],
    group: [
      { sender: 'Student1', content: 'Hello everyone!', timestamp: '10:00 AM', status: 'Read' },
      { sender: 'Teacher1', content: 'Good morning!', timestamp: '10:05 AM', status: 'Read' },
    ],
  });

  const [activeConversation, setActiveConversation] = useState(null); // Default: no conversation selected
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const handleConversationClick = (id) => {
    setActiveConversation(id);
    setNewMessage(''); // Clear the input when switching conversations

    // Mark the conversation as read
    setMessages((prevMessages) => ({
      ...prevMessages,
      [id]: prevMessages[id].map((msg) => ({ ...msg, status: 'Read' })),
    }));
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard'); // Navigate back to the Student Dashboard
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeConversation]: [
        ...(prevMessages[activeConversation] || []),
        { sender: 'You', content: newMessage, timestamp, status: 'Sent' },
      ],
    }));

    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
          <button
            onClick={handleBackToDashboard}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Back to Dashboard
          </button>
        </div>
        <ul className="space-y-2">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
              className={`p-3 rounded-lg cursor-pointer ${
                activeConversation === conversation.id ? 'bg-red-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{conversation.name}</span>
                {conversation.unread && <span className="text-xs text-red-500">Unread</span>}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white shadow-md rounded-lg p-6">
        {activeConversation ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {conversations.find((c) => c.id === activeConversation)?.name || 'Chat'}
            </h2>
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {(messages[activeConversation] || []).map((message, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">{message.sender}</span> at {message.timestamp}
                  </p>
                  <p className="text-gray-800">{message.content}</p>
                  <p className="text-xs text-gray-500">Status: {message.status}</p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="mt-4 flex items-center space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Select a conversation to start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Chat;
