//  REQUIRES    //
const fs = require ('fs') ;
const { report } = require('../routes/main');
const path = require ('path')

const db = require('../../database/models');
// const { Op } = require('sequelize/types');
const sequelize = db.sequelize;

/*****************************  JSON (NO SE UTILIZA MÁS) ****************************
 
//  LECTURA JSON    //
function leerJson () {
    const productsFilePath = path.join (__dirname, '../data/products.json') ;
    const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8')) ;
    return products ;
}

//  ESCRITURA JSON  //  
function escribirJson (array) {
    let newString = JSON.stringify(array, null, ' ') ;
    return fs.writeFileSync(path.join(__dirname,'../data/products.json'),newString)
}

//  BUSCAR POR ID   //

function findById (id){
    return  productosJSON.find(elem => String(elem.id) === id)
}

//  variable de todos los productos 
const productosJSON = leerJson();
*/

const productsControllers = {
    cart : (req,res) => {
        res.render ('productCart') ;
    },
    detail : (req,res) => {
        // Traigo el ID del parámetro para utilizar en el findByPk
        let id = req.params.id;
        
        // Utilizo la PK ID para traer solo el producto que quiero
        db.Products.findByPk(id)
            .then(function(producto){
                return res.render('productDetail', {producto: producto}) ;        
            })
    },
    list : (req,res) => {
        // Traigo todos los productos con findAll
        db.Products.findAll()
        .then( products => {
            res.render('productList', { products })
        })
    },
    create : (req,res) => {
        
      res.render('abmProductos-create');
    },
    store : (req,res) => {
        
        //  Creo el nuevo producto 
        db.Products.create ({
            //id_product :  products.length + 1 , NO ES NECESARIO
            name : req.body.name ,
            brand : req.body.brand ,
            detail : req.body.detail ,
            gender: req.body.gender ,
            category: 'list',
            Sizes : [{ size : req.body.size }] ,
            Colors : [{ color : req.body.color}] , 
            price : req.body.price ,
            image : req.file.filename
        },{
            include: [
             'Colors',
             'Sizes'
            ]
            }
        )

        .then(function(resultado){
            res.redirect('/products');
        })
        .catch()
    },
    edit: (req, res) => {
        let id = req.params.id;
        
        // Utilizo la PK ID para traer solo el producto que quiero
        
        db.Products.findByPk(id , {
            include: [
             "Colors",
             'Sizes'
            ]
            })
            .then(function(products){
                
                return res.render('abmProductos-edit' , {productToEdit : products}) ;        
            })

    },
    update : (req,res) => {
 

        //  Edito el producto actualizandolo 
            db.Products.update({
                name : req.body.name ,
                brand : req.body.brand ,
                detail : req.body.detail ,
                gender : req.body.gender ,
                //size : req.body.size ,
                //color : req.body.color, 
                price : req.body.price, 
                image : req.file.filename
            },{
                where: 
                {
                    id_product : req.params.id
                }
            })
            .then(function(resultado){
                res.redirect('/products');
            })

            
      
        //  Redirecciono a la vista de productos 


    } ,
    delete: (req,res) => {

        // Elimino de la BBDD el producto pasandole el ID
        db.Products.destroy({
            where:
            {
                id_product : req.params.id
            }
        })
        .then(function(resultado){
            res.redirect('/products');
        })
        
        // Redirecciono al apartado de productos
    },
    search: (req, res) => {
        db.Products.findAll({
            where:
            {
                name: {[Op.Like]: '%'+req.params.search+'%'} 
            }
        })
    }
}

module.exports = productsControllers ;