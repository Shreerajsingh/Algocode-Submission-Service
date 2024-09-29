async function v1Route(fastify, options) {
    fastify.register(require('./test/testRoute'), {prefix: '/test'});
}

module.exports = v1Route;