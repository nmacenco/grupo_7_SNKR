const express = require ('express')
    
const productsControllers = {
    login : (req,res) => {
        res.render ('login') ;
    },
    register : (req,res) => {
        res.render ('register')
    },
    store: (req,res) => {
     //  leo todo el JSON 
     let products = leerJson () ;
     //  creo el nuevo producto 
     let newProduct = {
         id :   products.length + 1 ,
         name : req.body.name ,
         brand : req.body.brand ,
         description : req.body.detail ,
         gender : req.body.gender ,
         size : req.body.size ,
         color : req.body.color , 
         price : req.body.price ,
         image : req.file.filename
     }
     //  agrego el nuevo producto al array 
     let newArray = [... products , newProduct] ;

     //  escribo el JSON 
     escribirJson (newArray) ;
     //  redirecciono la pagina 
     res.redirect ('/') ;
    }
}

module.exports = productsControllers ;