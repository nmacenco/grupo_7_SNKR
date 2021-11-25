//  REQUIRES    //
const fs = require ('fs') ;
const { report } = require('../routes/main');
const path = require ('path')

const db = require('../../database/models');
const Op = db.Sequelize.Op;
//const { Op } = require('sequelize/types');
const sequelize = db.sequelize;
const {validationResult} = require ('express-validator');

// CANTIDAD MÁXIMA DE PRODUCTOS POR PÁGINA, PARA UTILIZAR EN LIMIT/OFFSET
const cantMaxProductosPorPagina = 8
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
    detail : async (req,res) => {
        // Traigo el ID del parámetro para utilizar en el findByPk
        let id = req.params.id;
        let colors = await db.Color.findAll()
        let sizes = await db.Size.findAll()
        
        // Utilizo la PK ID para traer solo el producto que quiero
        db.Product.findByPk(id)
            .then(function(producto){
                return res.render('productDetail', {producto: producto , colors, sizes}) ;        
            })
    },
    list : async (req,res) => {

        const cantTotalDePaginas = await db.Product.count().then((resultado => {
            return Math.ceil(resultado/cantMaxProductosPorPagina)
        }))

        console.log(cantTotalDePaginas);

        if(req.query.pagina)
        {
        console.log(cantTotalDePaginas);
        let pagina = Number.parseInt(req.query.pagina);
        
        db.Product.findAll({ limit: cantMaxProductosPorPagina,
            offset: (pagina * cantMaxProductosPorPagina) - cantMaxProductosPorPagina})
        .then( products => {
            res.render('productList', { products, pagina, cantTotalDePaginas })
        })

        }
        else
        {
            //Traigo todos los productos con findAll
            let pagina = 0;

            db.Product.findAll({ limit: cantMaxProductosPorPagina,
                offset: pagina * cantMaxProductosPorPagina})
            .then( products => {
                res.render('productList', { products, pagina, cantTotalDePaginas })
            })
        }
    },
    create : async (req,res) => {
        let colors = await db.Color.findAll()
        let sizes = await db.Size.findAll()
        
        res.render('abmProductos-create' , {colors, sizes});
    },
    store : async (req,res) => {
        //Llamo a la variable con los errores de express-generator
        const resultadoValidacion = validationResult(req);

        //Evaluo si vinieron errores 
        if (resultadoValidacion.errors.length > 0) 
        {
            let colors = await db.Color.findAll()
            let sizes = await db.Size.findAll()
            
            res.render('abmProductos-create' , {errors : resultadoValidacion.mapped(),colors, sizes});
        }
        else
        {
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
        })

        await productCreate.setColors(req.body.color);
        await productCreate.setSizes(req.body.size);
        
        res.redirect('/products');
    }
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
        
        //Llamo a la variable con los errores de express-generator
        const resultadoValidacion = validationResult(req);

        //Evaluo si vinieron errores 
        if (resultadoValidacion.errors.length > 0) 
        {
            let id = req.params.id;
            let colors = await db.Color.findAll()
            let sizes = await db.Size.findAll()
            // Utilizo la PK ID para traer solo el producto que quiero
            
            db.Product.findByPk(id ,{
                include: [
                "colors",
                'sizes']})
                .then(function(products){
                    
                    return res.render('abmProductos-edit' , {errors : resultadoValidacion.mapped(),productToEdit : products , colors , sizes}) ;        
                })            
                //res.render ('abmProductos-edit' , { errors : resultadoValidacion.mapped(), oldData : req.body })
        } 
        else 
        {
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
        },
        {
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
                
            //  Redirecciono a la vista de productos 
                
            res.redirect('/products');

        }
    },
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
    search: async (req, res) => {

        let buscado = req.query.search;
        
        db.Product.findAll({
              where:
            {
                name: { [Op.like]:'%'+buscado+'%' }
            }
        })
        .then( products => {
            res.render('productList', {products});
        })
    },
    searchHombre : async (req,res) => {
        const cantTotalDePaginas = await db.Product.count().then((resultado => {
            return Math.ceil(resultado/cantMaxProductosPorPagina)
        }))

        let pagina = 0;
        
        db.Product.findAll({
           where : 
           {
               gender : { [Op.like] : 'Male'}
           } 
        })
        .then( products => {
            res.render('productList', {products, pagina, cantTotalDePaginas});
        })
    },
    searchMujer : async (req,res) => {
        const cantTotalDePaginas = await db.Product.count().then((resultado => {
            return Math.ceil(resultado/cantMaxProductosPorPagina)
        }))

        let pagina = 0;

        db.Product.findAll({
           where : 
           {
               gender : { [Op.like] : 'Female'}
           } 
        })
        .then( products => {
            res.render('productList', {products, pagina, cantTotalDePaginas});
        })
    },
    searchSale : async (req,res) => {
        const cantTotalDePaginas = await db.Product.count().then((resultado => {
            return Math.ceil(resultado/cantMaxProductosPorPagina)
        }))

        let pagina = 0;

        db.Product.findAll({
           where : 
           {
               category : { [Op.like] : 'Sale'}
           } 
        })
        .then( products => {
            res.render('productList', {products, pagina, cantTotalDePaginas});
        })
    },
    pagination: async (req,res) => {
            console.log(req.body)
    }
}

module.exports = productsControllers ;