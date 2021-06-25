import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {
  MONGODB_USER,
  MONGODB_PWD,
  MONGODB_IP,
  MONGODB_PORT,
  MONGODB_DB,
  REDIS_IP,
  REDIS_PORT,
  SESSION_SECRET,
  USE_SSL,
  SERVER_PORT
} from './config';
import { router as postRouter } from './routes/postRoutes';
import { router as authRouter } from './routes/authRoutes';

const mongoURL = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_IP}:${MONGODB_PORT}/${MONGODB_DB}`;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
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
app.enable('trust proxy');
app.use(cors());
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({ host: REDIS_IP, port: REDIS_PORT });
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: { secure: USE_SSL, maxAge: 86400000 }
  })
);
app.use(express.json());
app.use('/api/posts', postRouter);
app.use('/api', authRouter);
app.use('/api/heartbeat', (_, res) =>
  res.send('My node app is alive and running on Docker!')
);
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
