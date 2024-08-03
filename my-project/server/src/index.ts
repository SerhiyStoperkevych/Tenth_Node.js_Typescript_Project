import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import configureApp from './app';
import configureSocket from './socket/socket';
import connectDB from './database';

const app = express();
const port = 3001;
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Configure the Express app
configureApp(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Your frontend origin
    methods: ['GET', 'POST'],
  },
});
configureSocket(io);

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
