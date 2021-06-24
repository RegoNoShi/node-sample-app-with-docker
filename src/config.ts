export const MONGODB_IP = process.env.MONGODB_IP || 'mongodb';
export const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
export const MONGODB_DB = process.env.MONGODB_DB || 'blogdb';
export const MONGODB_USER = process.env.MONGODB_USER;
export const MONGODB_PWD = process.env.MONGODB_PWD;
export const REDIS_IP = process.env.REDIS_IP || 'redis';
export const REDIS_PORT = +(process.env.REDIS_PORT || 6379);
export const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
export const USE_SSL = process.env.USE_SSL === 'true';
