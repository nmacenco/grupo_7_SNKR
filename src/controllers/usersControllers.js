const express = require ('express') ;
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');


//  LECTURA JSON    //
function leerJson () {
    const usersFilePath = path.join (__dirname, '../data/users.json') ;
    const users = JSON.parse(fs.readFileSync(usersFilePath,'utf-8')) ;
    return users;
}

//  ESCRITURA JSON  //  
function escribirJson (array) {
    let newString = JSON.stringify(array, null, ' ') ;
    return fs.writeFileSync(path.join(__dirname,'../data/users.json'),newString)
}
//  BUSCAR USUARIO POR CAMPO //
function findByField (field, text) {
    let allUsers = leerJson();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
}

const usersController = {
    register : (req,res) => {
        res.render ('register')
    },
    store: (req,res) => {
     //  leo todo el JSON 
     let users = leerJson () ;
     //  creo el nuevo usuario 
     let newUser = {
         id :   users.length + 1 ,
         first_name : req.body.nombre,
         last_name: req.body.apellido,
         user_name : req.body.usuario ,
         email : req.body.email ,
         password : bcrypt.hashSync(req.body.password, 10) ,
         category: 'user', 
         image : req.file.filename
     }
     //  agrego el nuevo usuario al array 
     let newArray = [... users , newUser] ;

     //  escribo el JSON 
     escribirJson (newArray) ;

     //  redirecciono la pagina principal
     res.redirect ('/') ;
    },

    login : (req,res) => {
        res.render ('login', { old : req.body}) ;
    },
    processToLogin : (req,res) => {
        //  busco el mail que se ingreso en el formulario para ver si esta en la base de datos
        let users = leerJson() ;
        let userToLogin = findByField('email' , req.body.mail)
           
        //  comparo password ingresada con la que esta en la base de datos

        if (userToLogin){
            let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (isOkPassword){
                delete userToLogin.password ;
                req.session.userLogged = userToLogin;

                if (req.body.rememberUser){
                   res.cookie('userEmail', req.body.email , {maxAge : (1000 * 60) * 60})
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