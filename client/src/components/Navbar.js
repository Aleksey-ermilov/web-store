import React from 'react';
import { connect } from 'react-redux'
import  {Nav, Container, Navbar, Button, Dropdown} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";

import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    SHOP_ROUTE,
    WISH_LIST_ROUTE,
    ORDER_LIST_ROUTE,
    EDIT_USER_ROUTE
} from "../utils/consts";

import {setIsAuth, setUser,clearBasket} from '../store/user/actionUser'

const NavBar = ({user,isAuth,setIsAuth, setUser,clearBasket}) => {
    const history = useHistory()
    const location = useLocation()

    const logOut = () => {
        setIsAuth(false)
        setUser({})
        clearBasket()
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
               <div>
                   { location.pathname !== '/' && <Button variant={'outline-light'} onClick={() => history.goBack()}>Назад</Button>}
                   <NavLink className='ms-3' style={{color: 'white'}} to={SHOP_ROUTE}>SuperStore</NavLink>
               </div>
                {isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={'outline-light'}
                            onClick={ () => history.push(BASKET_ROUTE)}
                        >
                            Корзина
                        </Button>

                        {
                            user.roles.includes('ADMIN') &&
                            <Button
                                variant={'outline-light'}
                                onClick={ () => history.push(ADMIN_ROUTE)}
                                className="ms-4"
                            >
                                Админ панель
                            </Button>
                        }

                        <Dropdown className="ms-4">
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                {user.email}
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant='dark'>
                                <Dropdown.Item onClick={() => history.push(WISH_LIST_ROUTE)}>Понравилось</Dropdown.Item>
                                <Dropdown.Item onClick={() => history.push(ORDER_LIST_ROUTE)}>История заказов</Dropdown.Item>
                                <Dropdown.Item onClick={() => history.push(EDIT_USER_ROUTE)}>Изменить профиль</Dropdown.Item>
                                <Dropdown.Item onClick={logOut}>Выход</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button
                            variant={'outline-light'}
                            onClick={() => history.push(LOGIN_ROUTE)}
                            className="ms-4"
                        >Войти</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    isAuth: state.user.isAuth,
    user: state.user.user
})

const mapDispatchToProps = {
    setIsAuth, setUser, clearBasket
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);