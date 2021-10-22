import express from 'express';
import { router } from './routes';
import 'dotenv/config';

const app = express();

// Middlewares
app.use(express.json());
app.use(router);

app.listen(4000, () => console.log('Server is running on :4000'));
