const express = require ('express')
    
const productsControllers = {
    carrito : (req,res) => {
        res.render ('productCart') ;
    },
    detalle : (req,res) => {
        res.render ('productDetail') ;
    }
}

module.exports = productsControllers ;