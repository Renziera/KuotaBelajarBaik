import redis from 'redis';
import config from './config';
import { promisify } from 'util';

// Inisialisasi redis
const client = redis.createClient(config.redis);

export const get = promisify(client.get).bind(client);

export const set = promisify(client.set).bind(client);

export const push = promisify(client.rpush).bind(client);

export const expire = promisify(client.expire).bind(client);

export const del = promisify(client.del).bind(client);