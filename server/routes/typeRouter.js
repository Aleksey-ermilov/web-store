const Router = require('express')

const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const typeController = require('../controllers/typeController')

const router = new Router()

router.post('/', checkRoleMiddleware(['ADMIN']), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', typeController.delete)

module.exports = router