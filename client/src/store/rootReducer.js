import { combineReducers } from 'redux'

import {userReducer} from "./user/userReducer";
import {deviceReducer} from "./device/deviceReducer";
import {adminReducer} from "./admin/adminReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
    admin: adminReducer
})