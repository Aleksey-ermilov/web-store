const Type = require('../model/type')
const ApiError = require('../error/ApiError')

class TypeController {
    async create (req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll (req, res){
        const types = await Type.find()
        return res.json(types)
    }

    async delete (req, res){
        const {id} = req.params
        const type = await Type.findByIdAndDelete(id)
        return res.json(type)
    }
}

module.exports = new TypeController()