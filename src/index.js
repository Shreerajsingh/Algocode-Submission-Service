const fastify = require('fastify')({logger: true});     //Calling the fastify container
const app = require('./app');

fastify.register(app);

fastify.get('/ping', (req, res) => {
    res.send({message: 'pong'});
})

PORT = 3000;

fastify.listen({port: PORT}, (err) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server up at port: ${PORT}`);
})
