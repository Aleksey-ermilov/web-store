import {
    GET_USERS_ROLES, ADD_ROLE, SET_USERS
} from "./types";

const initialState = {
    users: [],
    roles: [],
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_USERS_ROLES:
            return {
                ...state,
                users: action.payload.users,
                roles: action.payload.roles
            }
        case SET_USERS:
            return {
            ...state,
            users: state.users.map( user => {
                if(user._id === action.payload._id){
                    console.log(action.payload)
                    return action.payload
                }
                return user
            })
        }
        case ADD_ROLE:
            return {
                ...state,
                roles: [...state.roles, action.payload.role]
            }
        default: return state
    }
}