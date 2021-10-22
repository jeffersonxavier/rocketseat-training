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

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log(`User connected in socket: ${socket.id}`);
});

export { serverHttp, io };
