const routes = require('express').Router();
const taskController = require('../controllers/toDoList');

routes.get('/', taskController.getAll);

routes.get('/:id', taskController.getSingle);

routes.post('/', taskController.createTask);

routes.put('/:id', taskController.updateTask);

routes.delete('/:id', taskController.deleteTask);

module.exports = routes;