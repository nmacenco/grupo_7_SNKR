const express = require('express');
const router = express.Router();


//CONTROLLER
const apiUsersController = require('../../controllers/api/apiUsersController');

//RUTAS
router.get('/', apiUsersController.list);
router.get('/:idUser', apiUsersController.detail);

module.exports = router;