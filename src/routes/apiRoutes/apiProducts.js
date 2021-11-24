const express = require ('express') ;
const router = express.Router() ; 

// REQUERIMIENTO CONTROLADOR // 

const apiProductsController = require ('../../controllers/api/apiProductsController') ;

// DEFINICION DE RUTAS PARA LA API // 

router.get ('/' , apiProductsController.list);

router.get ('/:id_product' , apiProductsController.detail);

module.exports = router ; 