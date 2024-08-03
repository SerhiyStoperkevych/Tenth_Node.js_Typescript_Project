import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

const configureCors = () => cors(corsOptions);

export default configureCors;
