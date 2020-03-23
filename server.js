const express = require('express');

const server = express();
const actionsRouter = require('./Actions/actionsRouter');
const projectsRouter = require('./Projects/projectsRouter');

server.use(express.json());

server.use(logger);

// Routers
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
	const url = req.originalUrl;
	const timeStamp = Date.now();

	console.log(`\nMethod: ${method} \nUrl: ${url} \nTime: ${timeStamp}`);

	next();
}

module.exports = server;
