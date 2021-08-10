const express = require ('express')
    
const productsControllers = {
    login : (req,res) => {
        res.render ('login') ;
    },
    register : (req,res) => {
        res.render ('register')
    }
}

module.exports = productsControllers ;