import {
    SET_SELECTED_TYPE,
    SET_SELECTED_BRAND,
    SET_BRAND,
    SET_TYPE,
    SET_DEVICE,
    SET_LIMIT,
    SET_PAGE,
    SET_TOTAL_COUNT
} from "./types";

const initialState = {
    selectedType: {_id:0, name:'Все'},
    selectedBrand: {_id:0, name:'Все'},
    types: [
        {_id:0, name:'Все'}, // not delete
    ],
    brands: [
        {_id:0, name:'Все'},
    ],
    devices: [],
    page: 1,
    totalCount: 0,
    limit: 10  // default
}

export const deviceReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_BRAND:
            return {
                ...state,
                brands: [ ...state.brands.filter( b => b._id === 0), ...action.payload]
            }
        case SET_TYPE:
            return {
                ...state,
                types: [ ...state.types.filter( t => t._id === 0), ...action.payload]
            }
        case SET_DEVICE:
            return {
                ...state,
                devices: action.payload
            }
        case SET_SELECTED_TYPE:
            return {
                ...state,
                selectedType: action.payload
            }
        case SET_SELECTED_BRAND:
            return {
                ...state,
                selectedBrand: action.payload
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SET_LIMIT:
            return {
                ...state,
                limit: action.payload
            }
        default: return state
    }
}