import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_USER, MONGODB_PWD, MONGODB_IP, MONGODB_PORT } from './config';

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

const app = express();
app.get('/', (req, res) => {
  res.send('<h2>Hello, world!</h2>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
