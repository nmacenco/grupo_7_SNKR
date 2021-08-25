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


const productsControllers = {
    cart : (req,res) => {
        res.render ('productCart') ;
    },
    detail : (req,res) => {
        res.render ('productDetail') ;
    },
    list : (req,res) => {
        res.render('productList');
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
            // image = req.file.filename
        }
        //  agrego el nuevo producto al array 
        let newArray = [... products , newProduct] ;

        //  escribo el JSON 
        escribirJson (newArray) ;
        //  redirecciono la pagina 
        res.redirect ('list')
    }
}

module.exports = productsControllers ;