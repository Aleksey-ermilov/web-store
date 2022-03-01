import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    DEVICE_ROUTE,
    PAYMENT_ROUTE,
    ORDER_LIST_ROUTE,
    EDIT_USER_ROUTE
} from "./utils/consts";

import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Auth from "./pages/Auth";
import Payment from "./pages/Payment";
import EditUser from "./pages/EditUser";
import OrderList from "./pages/OrderList";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: PAYMENT_ROUTE,
        Component: Payment
    },
    {
        path: EDIT_USER_ROUTE,
        Component: EditUser
    },
    {
        path: ORDER_LIST_ROUTE,
        Component: OrderList
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]