////////////////      REQUIRES        //////////////////////////////
const express = require('express');
const router = express.Router();
const path = require ('path');
const multer = require('multer');
const { body, check } = require('express-validator');

////////////////     CONFIGURACION DE MULTER      //////////////////
const storage = multer.diskStorage ({
    destination: (req,file,cb) => {
        folder = path.join(__dirname, '../../public/images/products')
        cb(null, folder)
    },
    filename : (req,file,cb) => {
        cb(null, file.fieldname +'-' + Date.now() + path.extname(file.originalname)) ;
    }
})

const upLoadFile = multer({storage});

//  CONTROLLER REQUIRE  //
const productsControllers = require ('../controllers/productsControllers')


/////////////////       EXPRESS VALIDATOR       ///////////////

// //Validación CUSTOM para las imagenes, ya que express validator solo valida strings.
// function validacionImagenes (archivo){
//     let extension = (path.extname(archivo)).toLowerCase();

//     switch(extension) {
//         case '.jpg': 
//             return 'ok'; 
//             break;
//         case '.jpeg': 
//             return 'ok'; 
//             break;
//         case '.png': 
//             return 'ok'; 
//             break;
//         case '.gif': 
//             return 'ok'; 
//             break;

//         default: return false
//     }
// }

let validacionesEditProducts = [
    body('name')
        .notEmpty().withMessage('Por favor ingresa el nombre del producto.')
        .isLength({min:5, max: undefined}).withMessage('El nombre del producto debe tener como mínimo 5 caracteres.'),
    body('detail')
        .notEmpty().withMessage('Por favor ingresa una descripción del producto').bail()
        .isLength({min:20, max:undefined}).withMessage('La descripción debe tener como mínimo 20 caracteres.'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;})
];


/////////////////////////       RUTAS       ////////////////////////// 
//  FORMULARIO DE CREACION DE PRODUCTOS //
router.get ('/create' , productsControllers.create) 
router.post ('/new/' , upLoadFile.single('image'), productsControllers.store) 

// CARRITO DE PRODUCTOS //
router.get ('/cart', productsControllers.cart);

// LISTADO DE PRODUCTOS POR SEARCH
router.get('/search', productsControllers.search);

//  DETALLE DE PRODUCTO PARTICULAR  //
router.get ('/:id', productsControllers.detail);

//  LISTADO GENERAL DE PRODUCTOS    //
router.get('/', productsControllers.list);

//  FORMULARIO DE EDICION DE PRODUCTOS  //
router.get ('/edit/:id' , validacionesEditProducts, productsControllers.edit); 

//  ACCION DE EDITAR PRODUCTO  //
router.put('/edit/:id' ,upLoadFile.single('image'),  productsControllers.update);

//  ACCION DE BORRADO   //
router.delete('/:id', productsControllers.delete);



module.exports = router ; 