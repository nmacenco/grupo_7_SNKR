const express = require ('express')
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
        res.render ('login') ;
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