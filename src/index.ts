import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_USER, MONGODB_PWD, MONGODB_IP, MONGODB_PORT } from './config';
import { router as postRouter } from './routes/postRoutes';

const mongoURL = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_IP}:${MONGODB_PORT}`;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((e) => {
      console.log('Unable to connect to MongoDB:', e);
      console.log('Retrying in 5 seconds:');
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/posts', postRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));
