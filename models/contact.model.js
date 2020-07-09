'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactShema = Schema({
    name: String,
    lastname: String,
    phone: Number
});

module.exports = mongoose.model('contact', contactShema);
