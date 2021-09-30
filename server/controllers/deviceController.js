const uuid = require('uuid')
const path = require('path')

const Device = require('../model/device')
const DeviceInfo = require('../model/device-info')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create (req, res, next){
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..','static',fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId:device._id
                    })
                )
            }

            return res.json(device)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res, next){
        try{
            let {brandId,typeId,limit,page} = req.query
            page = +page || 1
            limit = +limit || 9
            let skip = page * limit - limit
            let devices;
            let totalCount;

            // page send on front
            if(!brandId && !typeId){
                devices = await Device.find().skip(skip).limit(limit)
                totalCount = await Device.countDocuments()
            }
            if(brandId && !typeId){
                devices = await Device.find({brandId}).skip(skip).limit(limit)
                totalCount = await Device.countDocuments({brandId})
            }
            if(!brandId && typeId){
                devices = await Device.find({typeId}).skip(skip).limit(limit)
                totalCount = await Device.countDocuments({typeId})
            }
            if(brandId && typeId){
                devices = await Device.find({brandId, typeId}).skip(skip).limit(limit)
                totalCount = await Device.countDocuments({brandId, typeId})
            }

            return res.json({devices, totalCount})
            // res.json({mess: 'device ok all'})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne (req, res,next){
        try{
            const {id} = req.params
            let device = await Device.findById(id)
            const info = await DeviceInfo.find({deviceId:id})
            return res.json({device,info})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delete (req, res){

    }
}

module.exports = new DeviceController()