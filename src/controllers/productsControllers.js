//  REQUIRES    //
const fs = require ('fs') ;
const { report } = require('../routes/main');
const path = require ('path')

const db = require('../../database/models');
// const { Op } = require('sequelize/types');
const sequelize = db.sequelize;

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

const productsControllers = {
    cart : (req,res) => {
        res.render ('productCart') ;
    },
    detail : (req,res) => {
        let id = req.params.id;
        db.Products.findByPk(id)
            .then(function(producto){
                return res.render('productDetail', {producto: producto}) ;        
            })
    },
    list : (req,res) => {
        // let products = leerJson()
        // res.render('productList', { products});

        db.Products.findAll()
        .then( products => {
            res.render('productList', { products })
        })
    },
    create : (req,res) => {
        
      res.render ('abmProductos-create')
    },
    store : (req,res) => {
        //  leo todo el JSON 
        //let products = leerJson () ;
        //  creo el nuevo producto 
        db.Products.create ({
            //id_product :  products.length + 1 ,
            name : req.body.name ,
            brand : req.body.brand ,
            description : req.body.detail ,
            gender: req.body.gender ,
            category: 'list',
            //size : req.body.size ,
            //color : req.body.color , 
            price : req.body.price ,
            image : req.file.filename
        });
        //  agrego el nuevo producto al array 
        //let newArray = [... products , newProduct] ;

        //  escribo el JSON 
        //escribirJson (newArray) ;
        //  redirecciono la pagina 
        res.redirect ('/products') ;
    },
    edit: (req, res) => {
        let products = findById(req.params.id) ;

        res.render ('abmProductos-edit' , {productToEdit : products})
    },
    update : (req,res) => {
        //  leo todo el JSON 
        //let products = leerJson () ;

        //  producto editado 
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
            });
            
        //  escribir json 
        //escribirJson (editProduct) ;

        //  redireccionar la vista al aparatado productos 
        res.redirect ('/products') ;


    } ,
    delete: (req,res) => {

        db.Products.destroy({
            where:
            {
                id_product : req.params.id
            }
        })
        // Filter que devuelve todo el array sin el producto que tiene el mismo ID pasado por req
        let productosActualizados = productosJSON.filter(function(producto){
            return producto.id != req.params.id;
        })

        // Sobreescribo el JSON con el nuevo array actualizado
        escribirJson(productosActualizados) ;

        // Redirecciono al apartado de productos
        res.redirect('/products') ;
    },
    search: (req, res) => {
        db.Products.findOne({
            where:
            {
                name: {[Op.Like]: '%'+req.params.search+'%'} 
            }
        })
    }
}

module.exports = productsControllers ;