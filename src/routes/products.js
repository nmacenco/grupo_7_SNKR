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

const validacionesProducts = [
    body('name')
        .notEmpty().withMessage('Por favor ingresa el nombre del producto.').bail()
        .isLength({min:5, max: undefined}).withMessage('El nombre del producto debe tener como mínimo 5 caracteres.'),
    body('brand')
        .notEmpty().withMessage('Por favor ingrese la marca.'),
    body('detail')
        .isLength({min:20, max:undefined}).withMessage('La descripción debe tener como mínimo 20 caracteres.'),
    body('gender')
        .notEmpty().withMessage('Por favor ingrese el género.'),
    body('price')
        .notEmpty().withMessage('Por favor ingrese el precio.'),
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
    // validar el checkbox de talles y colores ES IMPOSIBLE (o muy dificil)
];



/////////////////////////       RUTAS       ////////////////////////// 
//  FORMULARIO DE CREACION DE PRODUCTOS //
router.get ('/create' , productsControllers.create) 
router.post ('/new/' , upLoadFile.single('image'), validacionesProducts, productsControllers.store) 

// CARRITO DE PRODUCTOS //
router.get ('/cart', productsControllers.cart);

// LISTADO DE PRODUCTOS POR SEARCH
router.get('/search', productsControllers.search);

//  DETALLE DE PRODUCTO PARTICULAR  //
router.get ('/:id', productsControllers.detail);

//  LISTADO GENERAL DE PRODUCTOS    //
router.get('/', productsControllers.list);

//  FORMULARIO DE EDICION DE PRODUCTOS  //
router.get ('/edit/:id', productsControllers.edit); 

//  ACCION DE EDITAR PRODUCTO  //
router.put('/edit/:id', upLoadFile.single('image'), validacionesProducts, productsControllers.update);

//  ACCION DE BORRADO   //
router.delete('/:id', productsControllers.delete);



module.exports = router ; 