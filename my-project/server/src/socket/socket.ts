import { Server } from 'socket.io';
import Chat from '../models/chat';

const configureSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    Chat.find().then(chats => {
      io.emit('initialMessages', chats);
    });

    socket.on('message', async (msg) => {
      console.log('Message received:', msg);

      const newChat = new Chat({ text: msg.text });
      await newChat.save();

      io.emit('message', newChat);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default configureSocket;
