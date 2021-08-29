//  REQUIRES    //
const fs = require ('fs') ;
const { report } = require('../routes/main');
const path = require ('path')

//  LECTURA JSON    //
function leerJson () {
    const productsFilePath = path.join (__dirname, '../data/products.json') ;
    const products = JSON.parse(fs.readFileSync(productsFilePath,'utf-8')) ;
    return products ;
}

//  ESCRITURA JSON  //  
function escribirJson (array) {
    let newString = JSON.stringify(array) ;
    return fs.writeFileSync(path.join(__dirname,'../data/products.json'),newString)
}


var productosJSON = leerJson();

const productsControllers = {
    cart : (req,res) => {
        res.render ('productCart') ;
    },
    detail : (req,res) => {
        let id = req.params.id;
        res.render ('productDetail', {productos: productosJSON, id}) ;
    },
    list : (req,res) => {
        res.render('productList', { productos: productosJSON});
    },
    abm : (req,res) => {
        res.render ('abmProductos')
    },
    create : (req,res) => {
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
        res.redirect ('list')
    },
    delete: (req,res) => {

        // Filter que devuelve todo el array sin el producto con el mismo ID pasado por req
        let productosActualizados = productos.filter(function(producto){
            return producto.id != req.params.id;
        })

        // Sobreescribo el JSON con el nuevo array actualizado
        escribirJson(productosActualizados)

        // Redirecciono al apartado de productos
        res.redirect('/products')
    }
}

module.exports = productsControllers ;