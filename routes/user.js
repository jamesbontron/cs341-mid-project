const express = require('express');
const routes = express.Router();

const userController = require('../controllers/users');

routes.get('/', userController.getAll);

routes.get('/:id', userController.getSingle);

routes.post('/', userController.createUser);

routes.put('/:id', taskController.updateUser);

routes.delete('/:id', taskController.deleteUser);

module.exports = routes;