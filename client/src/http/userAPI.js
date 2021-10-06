import jwt_decode from 'jwt-decode'

import { host, authHost } from './index'

export const registrationAPI = async (email, password) => {
    const {data} = await host.post('api/user/registration', {email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const loginAPI = async (email, password) => {
    const {data} = await host.post('api/user/login', {email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkAPI = async () => {
    const {data} = await authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const ratingAPI = async (rating,deviceId,userId) => {
    const {data} = await host.post('api/user/rating', {rating,deviceId,userId})
    return data
}