const express = require ('express') ;
const router = express.Router () ;
const usersControlador = require ('../controllers/usersControllers')

router.get ('/login', usersControlador.login ) ;
router.get ('/register' , usersControlador.register) ;

module.exports = router ; 