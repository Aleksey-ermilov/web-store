import React, {useState} from 'react';
import {Container,Card,Form,Button} from 'react-bootstrap'
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {connect} from "react-redux";

import {setIsAuth, setUser} from "../store/user/actionUser";

import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {registrationAPI, loginAPI} from "../http/userAPI";

const Auth = ({setIsAuth, setUser}) => {
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')

    const sing = async () => {
        try{
            let data
            if (isLogin){
                data = await loginAPI(email,password)
            }else {
                data = await registrationAPI(email,password)
            }
            setUser(data)
            setIsAuth(true)
            history.push(SHOP_ROUTE)
        }catch (e){
            console.log(e)
            // alert(e.response.data.message)
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль...'
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        type='password'
                    />
                    <div className='d-flex justify-content-between mt-3 '>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегиструйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-success'
                            onClick={sing}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuth: state.user.isAuth,
})

const mapDispatchToProps = {
    setIsAuth, setUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);