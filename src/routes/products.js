const express = require ('express') ;
const router = express.Router () ;
const productsControllers = require ('../controllers/productsControllers')

router.get ('/carrito', productsControllers.carrito);
router.get ('/detalle', productsControllers.detalle);
router.get('/lista', productsControllers.lista);

module.exports = router ; 