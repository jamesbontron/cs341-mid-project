const routes = require('express').Router();
const contactsController = require('../controllers/toDoList');

routes.get('/', contactsController.getAll);

routes.get('/:id', contactsController.getSingle);

routes.post('/', contactsController.createTask);

routes.put('/:id', contactsController.updateTask);

routes.delete('/:id', contactsController.deleteTask);

module.exports = routes;