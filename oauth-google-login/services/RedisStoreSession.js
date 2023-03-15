const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const redisClient = createClient({
    host: '127.0.0.1',
    port: '6379'
});

redisClient.connect().catch(err => console.error(err));

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'app',
    disableTouch: true
});

module.exports = { redisStore, redisClient }