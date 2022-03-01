const Router = require('express')

const userController = require('../controllers/userController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/createRole',authMiddleware, userController.createRole) //admin
router.post('/addToBasket', authMiddleware, userController.addToBasket)
router.post('/pay', authMiddleware, userController.pay)
router.post('/editUser',authMiddleware, userController.editUser)
router.post('/addRoleUser',authMiddleware, userController.addRoleUser) //admin
router.post('/kickRoleUser',authMiddleware, userController.kickRoleUser) //admin

router.get('/auth', authMiddleware, userController.check)
router.get('/getUser', authMiddleware, userController.getUser)
router.get('/getBasket', authMiddleware, userController.getBasket)
router.get('/getOrderList',authMiddleware, userController.getOrderList)
router.get('/getRoleUsers',authMiddleware, userController.getRoleUsers) //admin
router.get('/admin', userController.admin)

// router.get('/',)
// router.delete('/',)

module.exports = router