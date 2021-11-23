const express = require ('express') ;
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator');
const db = require('../../database/models');
const sequelize = db.sequelize;



// //  LECTURA JSON    //
// function leerJson () {
//     const usersFilePath = path.join (__dirname, '../data/users.json') ;
//     const users = JSON.parse(fs.readFileSync(usersFilePath,'utf-8')) ;
//     return users;
// }

// //  ESCRITURA JSON  //  
// function escribirJson (array) {
//     let newString = JSON.stringify(array, null, ' ') ;
//     return fs.writeFileSync(path.join(__dirname,'../data/users.json'),newString)
// }
// //  BUSCAR USUARIO POR CAMPO //
// function findByField (field, text) {
//     let allUsers = leerJson();
//     let userFound = allUsers.find(oneUser => oneUser[field] === text);
//     return userFound;
// }

const usersController = {
    register : (req,res) => {
        res.render ('register')
    },
    store: (req,res) => {
        // creo una variable de errores 
        const resultValidation = validationResult(req) ;
        if (resultValidation.errors.length > 0) {
            res.render ('register' , {
                errors : resultValidation.mapped(), 
                oldData : req.body
            })
        } else {
            db.User.create({
                first_name : req.body.nombre,
                last_name: req.body.apellido,
                username : req.body.usuario ,
                email : req.body.email ,
                password : bcrypt.hashSync(req.body.password, 10) ,
                category: 'user', 
                avatar : req.file.filename
            })
            //  redirecciono la pagina principal
            .then ( _ => {
                return res.redirect ('/') ;
            })
            
        }
    },

    login : (req,res) => {
        res.render ('login', { old : req.body}) ;
    },
    processToLogin : (req,res) => {
        //  busco el mail que se ingreso en el formulario para ver si esta en la base de datos
        
        db.User.findOne({
            where : { 
                email : req.body.mail 
            }
        }
        ).then((userToLogin) => {
            
            //  comparo password ingresada con la que esta en la base de datos
            if (userToLogin){
                let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                if (isOkPassword){
                    delete userToLogin.password ;
                    req.session.userLogged = userToLogin;
                    console.log(!req.session.userLogged);
                    if (req.body.rememberUser){
                       res.cookie('userEmail', req.body.mail , {maxAge : (1000 * 60) * 60})
                    }
                    return res.redirect('/users/profile')
                } 
                return res.render ('login' , {old : req.body,
                    errors: {
                        password : {
                            msg : 'Las credenciales son invalidas '
                        }
                    }})
                
            }
            return res.render ('login', {
                errors : { 
                    email : { 
                        msg : 'El usuario no se encuentra registrado en la base de datos '
                    }
                }
            })
        })

    },
    profile : (req,res) => {
       return res.render ('profile', { user : req.session.userLogged }) ;
    },

    logout : (req,res) => {
        res.clearCookie('userEmail') ;
        req.session.destroy() ;
        return res.redirect('/') ;
    }
}

module.exports = usersController ;