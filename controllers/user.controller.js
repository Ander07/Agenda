'use strict'

var User = require('../models/user.model');
var Contact = require('../models/contact.model');

function prueba(req,res){
    res.status(200).send({messege: 'Ruta de prueba'});
}

function saveUser(req,res){
    var user = User();
    var params = req.body;

    if(params.name && 
        params.lastname && 
        params.email && 
        params.password && 
        params.phone){

            User.findOne({email: params.email}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(userFind){
                    res.status(200).send({message: 'Correo ya utilizado'});
                }else{
                    user.name = params.name;
            user.lastname = params.lastname;
            user.email = params.email;
            user.password = params.password;
            user.phone = params.phone;

            user.save((err, userSaved)=>{
                if(err){
                    res.status(500).send({messege: 'Error general'});
                }else{
                    if(userSaved){
                        res.status(200).send({user: userSaved})
                    }else{
                        res.status(200).send({messege: 'Error al guardar'});
                    }
                }
            });
                }
            });
            
        }else{
        res.status(200).send({messege: 'por favor ingrese todos los datos'});
    }   
}

function listUsers(req, res){
    User.find({}).exec((err, users)=>{
        if(err){
            res.status(500).send({messege: 'Error con el servidor'});
        }else{
            if(User){
                res.status(200).send({todosLosUsuarios: users});
            }else{
                res.status(200).send({message: 'No se obtuvieron datos'});
            }
        }
    })
}

function listUser(req, res){
    var userId = req.params.id;

    User.findById(userId).exec((err, user)=>{
        if(err){
            res.status(500).send({messege: 'Error en el servidor'});
        }else{
            if(user){
                res.status(200).send({user: user});
            }else{
                res.status(200).send({messege: 'No hay registros'});
            }
        }
    })
}

function updateUser(req,res){
    let userId = req.params.id;
    let update = req.body;

    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdate)=>{
        if(err){
            res.status(500).send({messege: 'Error en el servidor'});
        }else{
            if(userUpdate){
                res.status(200).send({userUpdate: userUpdate});
            }else{
                res.status(200).send({messege: 'Error al actualizar'});
            }
        }
    })
}

function deleteUser(req,res){
    var userId = req.params.id;
    
    User.findByIdAndDelete(userId, (err, userDelete)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(userDelete){
                res.status(200).send({userDelete: 'Usuario eliminado', userDelete});
            }else{
                res.status(404).send({message: 'Error al eliminar el usuario'});
            }
        }
    })
}

function setContact(req, res){
    let userId = req.params.id;
    let params = req.body;
    let contact = new Contact();

    if(params.name && params.phone){

    User.findById(userId, (err, userFind)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(userFind){
             
            contact.name = params.name;
            contact.lastname = params.lastname;
            contact.phone = params.phone;

            User.findByIdAndUpdate(userId, {$push:{contacts: contact}},{new:true},(err, userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(userUpdated){
                    res.status(200).send({userUpdated: userUpdated});
                }else{
                    res.status(418).send({message: 'Error al actualizar'});
                }
            });
        }else{
            res.status(418).send({message: 'Usuario no encontrado'});
        }
    });
    }else{
        res.status(200).send({message: 'Faltan datos'});
    }

}

function updateContact(req, res){
    const userId = req.params.idU;
    var contactId = req.params.idC;
    var params = req.body;
    
    userId.findById(userId,(err, userOK)=>{
        if(err){
            res.status(500).send({messege: 'Error general'});
        }else if(userOK){
            User.findOneAndUpdate({_id:userId, "contacts._id":contactId},
                {"contacts.$.name": params.name,
                "contacts.$.lastname": params.lastname,
                "contacts.$.phone": params.phone},{new:true}, (err, userUpdate)=>{
                    if(err){
                        res.status(500).send({messege: "Error general"});
                    }else if(userUpdate){
                        res.send({user: userUpdate});
                    }else{
                        res.status(418).send({messege: "No se pudo actualizar el contacto"});
                    }
                });
        }else{
            res.status(418).send({messege: "NO existe el usuario"});
        }
    });
}


module.exports = {
    prueba,
    saveUser,
    listUsers,
    listUser,
    updateUser,
    deleteUser,
    setContact,
    updateContact
}