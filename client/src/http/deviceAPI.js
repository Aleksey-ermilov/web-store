import { host, authHost } from './index'

export const createTypeAPI = async (type) => {
    const {data} = await authHost.post('api/type', type)
    return data
}

export const fetchTypeAPI = async () => {
    const {data} = await host.get('api/type')
    return data
}

export const createBrandAPI = async (brand) => {
    const {data} = await authHost.post('api/brand', brand)
    return data
}

export const fetchBrandAPI = async () => {
    const {data} = await host.get('api/brand')
    return data
}

export const createDeviceAPI = async (device) => {
    const {data} = await authHost.post('api/device', device)
    return data
}

export const fetchDeviceAPI = async (typeId, brandId, page, limit=5) => {
    const {data} = await host.get('api/device', {params:{
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDeviceAPI = async (id) => {
    const {data} = await host.get('api/device/' + id)
    return data
}

export const ratingAPI = async (rating,deviceId,userId) => {
    const {data} = await host.post('api/device/rating', {rating,deviceId,userId})
    return data
}