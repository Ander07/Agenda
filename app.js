'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userRoutes = require('./routes/user.route');
var contactRoutes = require('./routes/contacts.route');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1', userRoutes);
app.use('/v1', contactRoutes);

/*
app.get('/prueba', (req, res)=>{
    res.status(200).send({messege: 'Prueba correcta'});
})*/

module.exports = app;