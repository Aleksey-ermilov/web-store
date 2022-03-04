const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')

module.exports = function (role){
    return function (req, res, next) {
        if (req.method === "OPTIONS" ){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: 'Нет авторизации'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            let isAccess = false
            for(let i = 0; i < role.length; i++){
                for (let j = 0; j < decoded.roles.length; j++){
                    if (role[i] === decoded.roles[j]){
                        isAccess = true
                        break;
                    }
                }
            }
            if (!isAccess){
                return res.status(403).json({message: 'Нет доступа'})
            }
            req.user = decoded
            next()
        }catch (e){
            res.status(401).json({message: 'Нет авторизации'})
        }
    }
}