const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError");
const User = require('../model/user')
const Basket = require('../model/basket')
const Role = require('../model/role')
const Rating = require('../model/rating')

const generateJwt = (_id,email,role) => {
    return jwt.sign(
        {_id, email, role},
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
           const token = generateJwt(req.user.id, req.user.email, req.user.roles)
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

    async admin (req, res, next){
        try{
            res.json({message: 'ok'})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setRating (req, res, next) {
        try {
            const {body} = req

            if (body.userId){
                const vote = await Rating.findOne({deviceId: body.deviceId,userId: body.userId})
                if (!vote){
                    const rating = await Rating.create({
                        deviceId: body.deviceId,
                        userId: body.userId,
                        rate: body.rating
                    })
                    const average = await averageRating(body.deviceId)
                    return res.json({rating, average})
                }else {
                    next(ApiError.badRequest('Вы уже голосовали'))
                }
            }else {
                const user = await User.findOne({email: 'nobody@nobody'})
                const rating = await Rating.create({
                    deviceId: body.deviceId,
                    userId: user._id,
                    rate: body.rating
                })
                const average = await averageRating(body.deviceId)
                return res.json({rating, average})
            }
        }catch (e){
            next(ApiError.badRequest('Невозможно проголосовать!!!'))
        }
    }

    async getRating (req, res, next) {
        try {

        }catch (e){
            next(ApiError.badRequest('Невозможно проголосовать!!!'))
        }
    }
}

async function averageRating (deviceId) {
    const rate = await Rating.find({deviceId})
    let average = (rate.reduce((partial_sum, a) => partial_sum + Number(a.rate),0)) / rate.length;
    return Math.round((average*10))/10
}

module.exports = new UserController()