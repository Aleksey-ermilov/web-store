const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError");
const User = require('../model/user')
const Basket = require('../model/basket')
const Role = require('../model/role')

const generateJwt = (_id,email,roles) => {
    return jwt.sign(
        {_id, email, roles},
        process.env.SECRET_KEY,
        {expiresIn: '8h'}
    )
}

class UserController {
    async registration (req, res, next){
        try {
            const {email, password} = req.body
            if (!email || !password){
                return next(ApiError.badRequest('Некоректный email или пароль'))
            }
            const candidate = await User.findOne({email})
            if (candidate){
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)

            const userRole = await Role.findOne({value: 'USER'})

            const user = await User.create({email,password: hashPassword,roles: [userRole.value]})
            const basket = await Basket.create({userId: user._id})
            const token = generateJwt(user._id,email,userRole.value)
            return res.json({token,message:'Пользоватнль создан!'})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async login (req, res, next){
        try{
            const {email,password} = req.body
            const user = await User.findOne({email})
            if (!user){
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword){
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            const token = generateJwt(user._id,user.email,user.roles)
            return res.json({token})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async check (req, res, next){
       try{
           const token = generateJwt(req.user._id, req.user.email, req.user.roles)
           res.json({token})
       }catch (e) {
           next(ApiError.badRequest(e.message))
       }
    }

    async createRole (req, res, next) {
        try {
            const {value} = req.body
            const role = await Role.create({value})
            return res.json({role})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getUser (req, res, next){
        try{
            const {user} = req
            let userFinder = await User.findById(user._id)
            userFinder.password = undefined

            res.json({user: userFinder})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasket (req, res, next){
        try{
            const {user} = req
            const basketFinder = await Basket.findOne({userId: user._id})
                .populate({
                    path: 'devices',
                    populate: {
                        path: 'device'
                    }
                }).exec()
            res.json({basket: basketFinder})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addToBasket (req, res, next){
        try{
            const {user, body: devices} = req
            const arrDevices = devices.map( device => {
                return { device: device._id, count:  device.count}
            })
            const updated = await Basket.findOneAndUpdate({userId: user._id}, {devices:arrDevices})
            res.json({message: 'ok', updated})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async pay (req, res, next){
        try{
            const {user} = req

            const basketFinder = await Basket.findOneAndUpdate({userId: user._id},{devices: []})

            res.json({message: 'ok'})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async admin (req, res, next){
        try{
            res.json({message: 'ok'})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new UserController()