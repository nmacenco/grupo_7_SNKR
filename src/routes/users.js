const express = require ('express') ;
const router = express.Router () ;
const usersControlador = require ('../controllers/usersControllers')

/* MULTER */
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/avatars'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

  const uploadFile = multer({ storage });

/***********************/

router.get ('/login', usersControlador.login ) ;
router.get ('/register' , usersControlador.register);
router.post('/register', uploadFile.single('avatar'), user)

module.exports = router ; 