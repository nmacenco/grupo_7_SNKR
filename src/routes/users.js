const express = require ('express') ;
const router = express.Router () ;
const multer = require('multer');
const path = require ('path') ;
const usersController = require ('../controllers/usersControllers')
const {body} = require ('express-validator')

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

// EXPRESS VALIDATOR //

const validations = [

   body('usuario').isLength({min : 4}).withMessage('Ingresa un usuario por favor').notEmpty(),
   body('password').isLength({min : 8 , max : 12}).withMessage('Ingresa una contraseña de minimo 8 caracteres y maximo 12 caracteres').notEmpty(),
   body('confirmacionPassword').notEmpty().withMessage('Confirma la contraseña por favor'),
   body('nombre').notEmpty().withMessage('Ingresa un nombre por favor'),
   body('apellido').notEmpty().withMessage('Ingresa un apellido por favor'),
   body('nacimiento').isDate().withMessage('Ingresa una fecha de nacimiento por favor').notEmpty(), 
   body('email').isEmail().withMessage('Ingresa un email valido').notEmpty(), 
   body('avatar').custom((value, { req }) => {
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

		return true;
	})
]

// MIDDLEWARES //
const authMiddleware = require ('../middlewares/authMiddleware')
const guestMiddleware = require ('../middlewares/guestMiddleware')

// LOGIN //
router.get ('/login', guestMiddleware , usersController.login ) ;
router.post ('/login', usersController.processToLogin)

// REGISTER //
router.get ('/register' , guestMiddleware , usersController.register);
router.post('/register' , uploadFile.single('avatar'), validations, usersController.store);

// PROFILE  //

router.get ( '/profile', authMiddleware , usersController.profile)

// LOGOUT   //

router.get('/logout' , usersController.logout)

module.exports = router ; 