import { combineReducers } from 'redux'

import {userReducer} from "./user/userReducer";
import {deviceReducer} from "./device/deviceReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
})