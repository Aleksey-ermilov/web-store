import {
    SET_BRAND,
    SET_DEVICE, SET_LIMIT, SET_PAGE,
    SET_SELECTED_BRAND,
    SET_SELECTED_TYPE, SET_TOTAL_COUNT,
    SET_TYPE
} from './types'

export function setType (type) {
    return {type: SET_TYPE, payload: type}
}

export function setBrand (brand) {
    return {type: SET_BRAND, payload: brand}
}

export function setDevice (device) {
    return {type: SET_DEVICE, payload: device}
}

export function selectedType (type) {
    return dispatch => {
        dispatch({type: SET_SELECTED_TYPE, payload: type})
        dispatch({type: SET_PAGE, payload: 1})
    }
}
export function selectedBrand (brand) {
    return dispatch => {
        dispatch({type: SET_SELECTED_BRAND, payload: brand})
        dispatch({type: SET_PAGE, payload: 1})
    }
}
export function setLimit (limit) {
    return {type: SET_LIMIT, payload: limit}
}
export function setPage (page) {
    return {type: SET_PAGE, payload: page}
}
export function setTotalCount (totalCount) {
    return {type: SET_TOTAL_COUNT, payload: totalCount}
}