import {
    GET_USERS_ROLES, ADD_ROLE, SET_USERS
} from './types'

// export function setType (data) {
//     return {type: GET_USERS_ROLES, payload: {users: data.users, roles: data.roles}}
// }

export function setUsersRoles (data) {
    return dispatch => {
        dispatch({type: GET_USERS_ROLES, payload: {users: data.users, roles: data.roles}})
    }
}

export function setUser (user) {
    return {type: SET_USERS, payload: {...user}}
}

export function setRole (role) {
    return {type: ADD_ROLE, payload: {...role}}
}