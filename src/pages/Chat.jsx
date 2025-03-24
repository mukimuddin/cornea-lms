import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';

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

  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const handleConversationClick = (id) => {
    setActiveConversation(id);
    setNewMessage('');
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setActiveConversation(null); // Close the chat view on outside click
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

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

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {!activeConversation && (
        <aside
          ref={sidebarRef}
          className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-md p-4 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
            <button
              onClick={() => navigate('/student-dashboard')}
              className="text-gray-800 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
          </div>
          <ul className="space-y-2">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
                className="p-3 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span>{conversation.name}</span>
                  {conversation.unread && <span className="text-xs text-red-500">Unread</span>}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main Chat Area */}
      {activeConversation && (
        <main className="flex flex-col h-screen w-full bg-white shadow-md rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-100 p-4 border-b sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-800">
              {conversations.find((c) => c.id === activeConversation)?.name || 'Chat'}
            </h2>
            <button
              onClick={() => setActiveConversation(null)}
              className="text-gray-800 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {(messages[activeConversation] || []).map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'You' ? 'text-right' : 'text-left'
                }`}
              >
                <p className="text-sm text-gray-600">
                  <span className="font-bold">{message.sender}</span> at {message.timestamp}
                </p>
                <p
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.sender === 'You'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="sticky bottom-0 bg-white p-4 border-t">
            <div className="flex items-center space-x-4 relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-500 hover:text-gray-700"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-0 z-50">
                  <Picker onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)} />
                </div>
              )}
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
          </div>
        </main>
      )}
    </div>
  );
}

export default Chat;
