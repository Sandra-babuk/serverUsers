const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)
// login path
router.post(`/login`,userController.loginController )
//get user 
router.get('/user', jwtMiddleware, userController.getUserController);

module.exports = router