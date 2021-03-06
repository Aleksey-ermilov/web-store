const Router = require('express')

const deviceController = require('../controllers/deviceController')

const router = new Router()

router.post('/', deviceController.create)
router.post('/rating', deviceController.setRating)

router.get('/rating', deviceController.getRating)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', deviceController.delete)

module.exports = router