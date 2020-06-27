const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/:username',UserController.select)
router.put('/:id',UserController.edit)
router.post('/login',UserController.login)
router.post('/register',UserController.register)
// router.post('/google-login', UserController.googleLogin) // OPTIONAL 

module.exports = router