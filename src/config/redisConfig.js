const Redis = require("ioredis");
const serverConfig = require("./serverConfig");

const redisConfig = {
    port: serverConfig.REDIS_PORT,
    host: serverConfig.REDIS_HOST,
    maxRetirePerRequest: null
}

const redisConnection = new Redis(redisConfig);

module.exports = redisConnection;