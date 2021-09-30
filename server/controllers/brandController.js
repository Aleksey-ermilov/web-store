const Brand = require('../model/brand')
const ApiError = require('../error/ApiError')

class BrandController {
    async create (req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll (req, res){
        const brands = await Brand.find()
        return res.json(brands)
    }

    async delete (req, res){
        const {id} = req.params
        const brand = await Brand.findByIdAndDelete(id)
        return res.json(brand)
    }
}

module.exports = new BrandController()