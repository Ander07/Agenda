'use strict'

var express = require('express');
var contactController = require('../controllers/contact.controller');

var api = express.Router();

api.post('/saveContact', contactController.saveContact);
api.get('/listContacts', contactController.listContacts);
api.get('/listContact/:id', contactController.listContact);


module.exports = api;