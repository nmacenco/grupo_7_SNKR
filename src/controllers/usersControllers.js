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


const productsControllers = {
    login : (req,res) => {
        res.render ('login', { old : req.body}) ;
    },
    processToLogin : (req,res) => {
        //  busco el mail que se ingreso en el formulario para ver si esta en la base de datos
        let userToLogin = leerJson().find(element => {
            return element.email = req.body.mail ;
        })
        //  comparo password ingresada con la que esta en la base de datos
        // PENDIENTE UNSAR BYCRIPT EN REGISTER PARA PODER USARLO EN EL LOGIN TAMBIEN 
        if (userToLogin){
            if (req.body.password == userToLogin.password){
                delete userToLogin.password ;
                // req.session.userLogged = userToLogin;
                if (req.body.rememberUser){
                    res.cookie('userEmail', req.userToLogin.email , {maxAge : (1000 * 60) * 60})
                }
                return res.redirect('/')
            } else { 
                res.render ('login' , {old : req.body,
                errors: {
                    password : {
                        msg : 'credenciales invalidas '
                    }
                }})
            }
        }

        return res.render ('login', {
            errors : { 
                email : { 
                    msg : 'El usuario no se encuentra registrado en la base de datos '
                }
            }
        })




    },
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
    }
}

module.exports = productsControllers ;