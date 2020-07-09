'use strict'

//exportando libreria de mongo para conexion
var mongoose = require('mongoose');
var app = require('./app');
var port = 3300;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Agenda2018134', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('Conexion a la base de datos correctamente');
    //Levantar servidor de express
    app.listen(port, ()=>{
        console.log('Servidor de express corriendo');
    })
})
.catch(err=>{
    console.log('Error al conectarse, error:', err);
})