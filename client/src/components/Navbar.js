import React from 'react';
import { connect } from 'react-redux'
import  {Nav, Container, Navbar, Button} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";

import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {setIsAuth, setUser} from '../store/user/actionUser'

const NavBar = ({isAuth,setIsAuth, setUser}) => {
    const history = useHistory()

    const logOut = () => {
        setIsAuth(false)
        setUser({})
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={'outline-light'}
                            onClick={ () => history.push(ADMIN_ROUTE)}
                        >Админ панель</Button>
                        <Button
                            variant={'outline-light'}
                            onClick={logOut}
                            className="ms-4"
                        >Выход</Button>
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
    setIsAuth, setUser
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);