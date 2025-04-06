import Redis from 'ioredis';

const redisClient = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('connect', () => {
    strapi.log.info('Connected to Redis');
});

redisClient.on('error', (err) => {
    strapi.log.error('Redis connection error:', err);
});

export default redisClient;