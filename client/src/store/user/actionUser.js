import {
    SET_AUTH,
    SET_USER
} from './types'

export function rerun (token, user) {
    /*return {
        type: RERUN,
        payload: { token, user }
    }*/
}

export function setIsAuth (isAuth) {
    return {type: SET_AUTH, payload: isAuth}
}

export function setUser (user) {
    return {type: SET_USER, payload: user}
}

export function updateUser (user) {
    return async (dispatch, getState) => {
        try{
            const { user } = getState()

        } catch (e){

        }
    }
}