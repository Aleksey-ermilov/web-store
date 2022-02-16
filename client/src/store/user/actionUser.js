import {
    ADD_DEVICE_BASKET, CLEAR_BASKET,
    REMOVE_DEVICE_BASKET,
    SET_AUTH, SET_BASKET,
    SET_USER, UPDATE_DEVICE_BASKET
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

export function addDeviceBasket (devise) {
    return {type: ADD_DEVICE_BASKET, payload: devise}
}

export function updateDeviceBasket (devise) {
    return {type: UPDATE_DEVICE_BASKET, payload: devise}
}

export function removeDeviceBasket (id) {
    return {type: REMOVE_DEVICE_BASKET, payload: id}
}

export function clearBasket () {
    return {type: CLEAR_BASKET}
}

export function setBasket (basket) {
    return {type: SET_BASKET, payload: basket}
}

export function updateUser (user) {
    return async (dispatch, getState) => {
        try{
            const { user } = getState()

        } catch (e){

        }
    }
}