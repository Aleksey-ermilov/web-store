import React, {useEffect,useState} from 'react';
import {useHistory,useLocation} from "react-router-dom";
import { connect } from 'react-redux'

import {Container, Button, Col, Row, Form,Card} from "react-bootstrap";

import { getUser, pay } from "../http/userAPI";
import {clearBasket,setError} from "../store/user/actionUser";

import {SHOP_ROUTE} from "../utils/consts";

import Loading from "../components/Loading";
import SuccessBuy from "../components/modals/SuccessBuy";

const Payment = ({basket,clearBasket,setError}) => {
    const history = useHistory()
    const location = useLocation()

    const [user,setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [ isSuccessBuyVisible, setIsSuccessBuyVisible ] = useState(false)

    useEffect(()=>{
        getUser().then(data => setUser(data.user))
            .catch(e => setError(e.response.data.message))
            .finally(() => setIsLoading(false))
    },[getUser])

    const btnPay = () => {
        pay(basket).then(data => {
            setIsSuccessBuyVisible(true)
        })
            .catch(e => setError(e.response.data.message))
    }

    const hideModal = () => {
        setIsSuccessBuyVisible(false)
        clearBasket()
        history.push(SHOP_ROUTE)
    }

    if (isLoading){
        return <Loading />
    }

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={8}>

                    <Form.Control
                        placeholder='Введите ваш email...'
                        value={user.email}
                        onChange={ e => setUser(prev => ({...prev, email:e.target.value}) )}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш имя...'
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш телефон...'
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш адрес...'
                    />

                </Col>
                <Col md={4}>
                    <Card
                        className='p-3'
                    >
                        <div className='d-flex justify-content-between fs-4'>
                            <div>ИТОГО:</div>
                            <div>{location.state.sum}</div>
                        </div>
                        <Button
                            variant='outline-dark'
                            className='mt-4'
                            onClick={btnPay}
                        >
                            Оплатить
                        </Button>
                    </Card>
                </Col>
            </Row>

            <SuccessBuy show={isSuccessBuyVisible} onHide={hideModal} />
        </Container>
    );
};

const mapStateToProps = state => ({
    basket: state.user.basket,
})

const mapDispatchToProps = {
    clearBasket,setError
}

export default connect(mapStateToProps,mapDispatchToProps)(Payment);