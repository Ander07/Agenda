'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');

var api = express.Router();

api.get('/pruebaControlador', userController.prueba);
api.post('/saveUser', userController.saveUser);
api.get('/listUsers', userController.listUsers);
api.get('/listUser/:id', userController.listUser);
api.put('/updateUser/:id', userController.updateUser);
api.delete('/deleteUser/:id', userController.deleteUser);
api.put('/:id/setContact', userController.setContact);
api.post('/:id/updateContact', userController.updateContact);

module.exports = api;