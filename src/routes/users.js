const express = require ('express') ;
const router = express.Router () ;
const multer = require('multer');
const path = require ('path') ;
const usersController = require ('../controllers/usersControllers')

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


// LOGIN //
router.get ('/login', usersController.login ) ;
router.post ('/login', usersController.processToLogin)

// REGISTER //
router.get ('/register' , usersController.register);
router.post('/register', uploadFile.single('avatar'), usersController.store);

// PROFILE  //

router.get ( '/profile' , usersController.profile)

// LOGOUT   //

router.get('/logout' , usersController.logout)

module.exports = router ; 