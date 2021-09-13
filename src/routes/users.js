const express = require ('express') ;
const router = express.Router () ;
const multer = require('multer');
const path = require ('path') ;
const usersControlador = require ('../controllers/usersControllers')

/* MULTER */
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/users/avatars'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

  const uploadFile = multer({ storage });

/***********************/

router.get ('/login', usersControlador.login ) ;
router.get ('/register' , usersControlador.register);
router.post('/register', uploadFile.single('avatar'), usersControlador.store);

module.exports = router ; 