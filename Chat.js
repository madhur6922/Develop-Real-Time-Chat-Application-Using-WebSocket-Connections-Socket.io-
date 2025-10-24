import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from server
    socket.on('chat message', (msg) => {
      setChatMessages(prev => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat message', message); // Send message to server
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Real-Time Chat</h2>
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px', padding: '10px' }}>
        {chatMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ marginLeft: '10px' }}>Send</button>
    </div>
  );
}

export default Chat;
