const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/toDoList', require('./toDoList'));
routes.use('/home', require('./toDoList'));

module.exports = routes;
