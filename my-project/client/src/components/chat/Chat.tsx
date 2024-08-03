import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useMyContext } from '../../MyContext';

const socket: Socket = io('http://localhost:3001');

const Chat: React.FC = () => {
  const { username, text, setText, texts, setTexts } = useMyContext();
  const [newMessages, setNewMessages] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    // Handler for new messages
    const handleMessage = (msg: { id: number; text: string }) => {
      setNewMessages((prevNewMessages) => [...prevNewMessages, msg]);
      setTexts((prevTexts) => [...prevTexts, msg]);
    };

    // Handler for initial chat list
    const handleInitialMessages = (initialChats: { id: number; text: string }[]) => {
      setTexts(initialChats);
    };

    // Handler for updated chat list
    const handleUpdateChats = (updatedChats: { id: number; text: string }[]) => {
      setTexts(updatedChats);
    };

    socket.on('initialMessages', handleInitialMessages);
    socket.on('message', handleMessage);
    socket.on('updateChats', handleUpdateChats);

    return () => {
      socket.off('initialMessages', handleInitialMessages);
      socket.off('message', handleMessage);
      socket.off('updateChats', handleUpdateChats);
    };
  }, [setTexts]);

  const sendText = () => {
    if (text.trim() !== '') {
      socket.emit('message', { text });
      setText('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendText}>Send</button>
      </div>
      <div>
        <h2>List of all texts</h2>
        <div>
          <h3>New Messages:</h3>
          {newMessages.map((msg) => (
            <div key={msg.id}>
              <h3>By: {username}</h3>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <h3>Previous Messages:</h3>
          {texts.map((msg) => (
            <div key={msg.id}>
              <h3>By: {username}</h3>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
