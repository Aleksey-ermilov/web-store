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

export const getUser = async () => {
    const {data} = await authHost.get('api/user/getUser' )
    return data
}

export const editUser = async (user) => {
    const {data} = await authHost.post('api/user/editUser', {user} )
    return data
}

export const getBasket = async () => {
    const {data} = await authHost.get('api/user/getBasket' )
    return data.basket && data.basket.devices.map( d =>  ({...d.device, count: d.count}) )
}

export const addToBasket = async (devices) =>{
    const {data} = await authHost.post('api/user/addToBasket', devices )
    return data
}

export const pay = async (devices) => {
    const {data} = await authHost.post('api/user/pay', devices)
    return data
}