const testRequest = require("../../../../controllers/testController");

async function testRoute(fastify, options) {
    fastify.get('/ping', testRequest)
}

module.exports = testRoute;