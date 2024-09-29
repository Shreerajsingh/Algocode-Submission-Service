const fastifyCors = require('@fastify/cors');
const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const apiRoute = require('./routes/api/apiRoute');

/**
 * 
 * @param {Fastify object} fastify 
 * @param {*} options 
 */
async function app(fastify, options) {
    fastify.register(fastifyCors);

    fastify.register(servicePlugin);

    fastify.register(apiRoute, {prefix: '/api'});
}

module.exports = fastifyPlugin(app);