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
        db.Product.findByPk(id)
            .then(function(producto){
                return res.render('productDetail', {producto: producto}) ;        
            })
    },
    list : (req,res) => {
        // Traigo todos los productos con findAll
        db.Product.findAll()
        .then( products => {
            res.render('productList', { products })
        })
    },
    create : async (req,res) => {
        let colors = await db.Color.findAll()
        let sizes = await db.Size.findAll()
        
        res.render('abmProductos-create' , {colors, sizes});
    },
    store : async (req,res) => {
        
        //  Creo el nuevo producto 
        let productCreate = await db.Product.create ({
            //id_product :  products.length + 1 , NO ES NECESARIO
            name : req.body.name ,
            brand : req.body.brand ,
            detail : req.body.detail ,
            gender: req.body.gender ,
            category: 'list',
            //sizes : [{ size : req.body.size }] ,
            //colors : [{ color : req.body.color}] , 
            price : req.body.price ,
            image : req.file.filename
        }
        // ,{
        //     include: [
        //      'colors',
        //      'sizes'
        //     ]
        //     }
        )
        await productCreate.setColors(req.body.color);
        await productCreate.setSizes(req.body.size);
        res.redirect('/products');
        // .then(function(resultado){
        // })
        // .catch()
    },
    edit: async (req, res) => {
        let id = req.params.id;
        let colors = await db.Color.findAll()
        let sizes = await db.Size.findAll()
        // Utilizo la PK ID para traer solo el producto que quiero
        
        db.Product.findByPk(id , {
            include: [
             "colors",
             'sizes'
            ]
            })
            .then(function(products){
                
                return res.render('abmProductos-edit' , {productToEdit : products , colors , sizes}) ;        
            })

    },
    update : async (req,res, next) => {
 
        
        //  Edito el producto actualizandolo 
        await db.Product.update({
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
            let productFound = await db.Product.findByPk(req.params.id);
            if(productFound){
                await productFound.setColors(req.body.color);
                await productFound.setSizes(req.body.size);
            }
            res.redirect('/products');
            // .then(function(resultado){
            // })

            
      
        //  Redirecciono a la vista de productos 


    } ,
    delete: async (req,res) => {

        // Elimino de la BBDD el producto pasandole el ID
        let product = await db.Product.findByPk(req.params.id);
        await product.setColors([]);
        await product.setSizes([]);
        db.Product.destroy({
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
        db.Product.findAll({
            where:
            {
                name: {[Op.Like]: '%'+req.params.search+'%'} 
            }
        })
    }
}

module.exports = productsControllers ;