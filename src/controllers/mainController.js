//  REQUIRES    //
const fs = require ('fs') ;
const path = require ('path') ;
const db = require('../../database/models');
const sequelize = db.sequelize;

let mainController = {
    home : function(req,res) {
        db.Products.findAll()
        .then((products) => {
            res.render ('index', {products : products} );
        })
    },
}

module.exports = mainController ;