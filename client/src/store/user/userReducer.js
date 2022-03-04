import {
    ADD_DEVICE_BASKET, CLEAR_BASKET,
    REMOVE_DEVICE_BASKET,
    SET_AUTH,
    SET_USER, UPDATE_DEVICE_BASKET,
    SET_BASKET, SET_ERROR
} from "./types";

const initialState = {
    isAuth: false,
    user: {},
    basket: [],
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_AUTH: return {
            ...state,
            isAuth: action.payload
        }
        case SET_USER: return {
            ...state,
            user: action.payload
        }
        case ADD_DEVICE_BASKET: return {
            ...state,
            basket: [action.payload, ...state.basket]
        }
        case UPDATE_DEVICE_BASKET: return {
            ...state,
            basket: state.basket.map( dev => {
                if (dev._id === action.payload._id){
                    return action.payload
                }
                return dev
            })
        }
        case REMOVE_DEVICE_BASKET: return {
            ...state,
            basket: state.basket.filter(device => device._id !== action.payload)
        }
        case CLEAR_BASKET: return {
            ...state, basket: []
        }
        case SET_BASKET: return {
            ...state, basket: action.payload
        }
        case SET_ERROR: return {
            ...state, error: action.payload
        }
        default: return state
    }
}