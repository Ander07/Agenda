'use strict'

var Contact = require('../models/contact.model');

function saveContact(req, res){
    var contact = Contact();
    var params = req.body;

    if(params.name &&
        params.lastname &&
        params.phone){

            Contact.findOne({phone: params.phone}, (err, contactFind)=>{
                if(err){
                    res.status(500).send({messege: 'Error general'});
                }else if(contactFind){
                    res.status(200).send({messege: 'Teléfono existente'});
                }else{
                    contact.name = params.name,
                    contact.lastname = params.lastname,
                    contact.phone = params.phone

                    contact.save((err, contactSaved)=>{
                        if(err){
                            res.status(500).send({messege: 'Error general'});
                        }else if(contactSaved){
                            res.status(200).send({messege: contactSaved});
                        }else{
                            res.status(500).send({messege: 'Error al guardar'});
                        }
                    });
                }
            });

        }else{
            res.status(200).send({messege: 'Por favor ingrese los datos'});    
    }   
}

function listContacts(req, res){
    Contact.find({}).exec((err, contacts)=>{
        if(err){
            res.status(500).send({messege: 'Error con el servidor'});
        }else if(Contact){
            res.status(200).send({todosLosContactos: contacts});
        }else{
            res.status(200).send({messege: 'No se obtuvieron contactos'});  
        }
    })
}

function listContact(req, res){
    var contactId = req.params.id;

    Contact.findById(contactId).exec((err, contact)=>{
        if(err){
            res.status(500).send({messege: 'Error con el servidor'});
        }else if(Contact){
            res.status(200).send({contacto: contact});
        }else{
            res.status(200).send({messege: 'No hay registros'});
        }
    })
}


module.exports = {
    saveContact,
    listContacts,
    listContact
}