/* eslint-disable @typescript-eslint/no-explicit-any */
// import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import { ImageUploads } from './app/modules/upload/route.upload';

const app: Application = express();

// parser middleware
app.use(express.json());
// app.use(cors());
// origin: 'http://localhost:5173', // Update with the actual origin of your frontend

app.use(
  cors({
    origin: 'http://localhost:3000', // Update with the actual origin of your frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);

app.use(cookieParser());

// application routes
app.use('/api/v1', router);
// app.use('/api/v1/upload', ImageUploads);

app.get('/', (req: Request, res: Response) => {
  res.send('portfolio-server-mongoose is running....');
});

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/a', test);
// not found middleware with http-status

app.use(notFound);

// global err handler middleware. must declare it in the last off the file
app.use(globalErrorHandler);

export default app;
