import React from 'react';
import { connect } from 'react-redux'
import  {Nav, Container, Navbar, Button} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";

import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {setIsAuth, setUser,clearBasket} from '../store/user/actionUser'

const NavBar = ({isAuth,setIsAuth, setUser,clearBasket}) => {
    const history = useHistory()

    const logOut = () => {
        setIsAuth(false)
        setUser({})
        clearBasket()
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={'outline-light'}
                            onClick={ () => history.push(BASKET_ROUTE)}
                        >
                            Корзина
                        </Button>
                        <Button
                            variant={'outline-light'}
                            onClick={ () => history.push(ADMIN_ROUTE)}
                            className="ms-4"
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={'outline-light'}
                            onClick={logOut}
                            className="ms-4"
                        >
                            Выход
                        </Button>
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
})

const mapDispatchToProps = {
    setIsAuth, setUser, clearBasket
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);