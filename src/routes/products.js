const express = require ('express') ;
const router = express.Router () ;
const productsControllers = require ('../controllers/productsControllers')

router.get ('/carrito', productsControllers.carrito);
router.get ('/detalle', productsControllers.detalle);
router.get('/list', productsControllers.lista);

module.exports = router ; 