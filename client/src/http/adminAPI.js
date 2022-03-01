import {authHost} from "./index";

export const createRole = async (value) => {
    const {data} = await authHost.post('api/user/createRole', {value} )
    return data
}

export const getRoleUsers = async () => {
    const {data} = await authHost.get('api/user/getRoleUsers' )
    return data
}

export const addRoleUser = async (id,role) => {
    const {data} = await authHost.post('api/user/addRoleUser', {id,role})
    return data
}

export const kickRoleUser = async (id,role) => {
    const {data} = await authHost.post('api/user/kickRoleUser', {id,role})
    return data
}