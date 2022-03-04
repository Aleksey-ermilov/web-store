import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import  {Container, Button, Form} from "react-bootstrap";

import {getUser,editUser} from "../http/userAPI";

import { setUser, setError } from "../store/user/actionUser";

import Loading from "../components/Loading";

const EditUser = ({setUser,setError}) => {
    const [ password, setPassword] = useState('')

    const [newUser,setNewUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        getUser().then(data => setNewUser(data.user))
            .catch(e => setError(e.response.data.message))
            .finally(() => setIsLoading(false))
    },[getUser])

    const changeUser = () => {
        editUser({...newUser,password}).then(data => {
            console.log('data',data)
            setUser(data.user)
        })
            .catch(e => setError(e.response.data.message))

    }

    if (isLoading){
        return <Loading />
    }

    return (
        <Container>
            <Form className='d-flex flex-column'>
                <Form.Control
                    className='mt-3'
                    placeholder='Введите ваш email...'
                    value={newUser.email}
                    onChange={ e => setNewUser(prev => ({...prev, email:e.target.value}) )}
                />
                <Form.Control
                    className='mt-3'
                    placeholder='Введите ваш пароль...'
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    type='password'
                />
                <div className='d-flex justify-content-between mt-3 '>

                    <Button
                        variant='outline-success'
                        onClick={changeUser}
                    >
                        Изменить
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = {
    setUser,setError
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);