import express from 'express';
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
  USE_SSL
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

const port = process.env.PORT || 3000;
const app = express();
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
app.use('/posts', postRouter);
app.use('/', authRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));
