//  REQUIRES    //
const express = require ('express') ;
const router = express.Router () ;
const path = require ('path') ;
const multer = require ('multer')

//  CONFIGURACION DE MULTER //

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

// CARRITO DE PRODUCTOS //
router.get ('/cart', productsControllers.cart);

//  DETALLE DE PRODUCTO PARTICULAR  //
router.get ('/:id', productsControllers.detail);

//  LISTADO GENERAL DE PRODUCTOS    //
router.get('/', productsControllers.list);

//  FORMULARIO DE CREACION DE PRODUCTOS //
router.get ('/create' , productsControllers.abm) 
router.post ('/create' , upLoadFile.single('image') , productsControllers.create) 

//  FORMULARIO DE EDICION DE PRODUCTOS  //
router.get ('/:id/edit' , productsControllers.abm) 

//  ACCION DE BORRADO   //
router.delete ('/:id', productsControllers.delete)


module.exports = router ; 