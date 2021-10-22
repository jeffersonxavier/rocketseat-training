import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './routes';
import 'dotenv/config';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);

server.listen(4000, () => console.log('Server is running on :4000'));

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log(`User connected in socket: ${socket.id}`);
});
