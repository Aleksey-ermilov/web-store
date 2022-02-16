const Router = require('express')

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/role', userController.createRole)
router.post('/addToBasket', authMiddleware, userController.addToBasket)
router.post('/pay', authMiddleware, userController.pay)

router.get('/auth', authMiddleware, userController.check)
router.get('/getUser', authMiddleware, userController.getUser)
router.get('/getBasket', authMiddleware, userController.getBasket)
router.get('/admin', userController.admin)

// router.get('/',)
// router.delete('/',)

module.exports = router