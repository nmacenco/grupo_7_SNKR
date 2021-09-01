//  REQUIRES    //
const fs = require ('fs') ;
const path = require ('path')

//  LECTURA JSON    //
function leerJson () {
    const productsFilePath = path.join (__dirname, '../data/products.json') ;
    const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8')) ;
    return products ;
}
//  variable de todos los productos 
const productosJSON = leerJson();
let mainController = {
    home : function(req,res) {

        res.render ('index', {products : productosJSON} );
    },
}

module.exports = mainController ;