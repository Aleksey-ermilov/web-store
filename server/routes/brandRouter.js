const Router = require('express')

const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const brandController = require('../controllers/brandController')

const router = new Router()
router.post('/',checkRoleMiddleware(['ADMIN']), brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', brandController.delete)

module.exports = router