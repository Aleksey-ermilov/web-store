import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import  {Container, Button} from "react-bootstrap";

import {removeDeviceBasket, updateDeviceBasket,setError } from "../store/user/actionUser";
import {addToBasket} from "../http/userAPI";

import BasketCard from "../components/BasketCard";
import {PAYMENT_ROUTE, SHOP_ROUTE} from "../utils/consts";


const Basket = ({basket, removeDeviceBasket,updateDeviceBasket,setError}) => {

    const history = useHistory()

    useEffect( () => {
        async function myF (){
            try {
                await addToBasket(basket)
            } catch (e){
                setError(e.response.data.message)
            }
        }
        myF ()
    }, [basket])

    const sum = basket && (basket.reduce((partial_sum, a) => partial_sum + (Number(a.price)* +a.count),0));

    const removeDevice = id => {
        removeDeviceBasket(id)
    }

    return (
        <Container>
            {
                basket && basket.length ?
                        <>
                            {basket.map(device =>
                                <BasketCard
                                    key={device._id}
                                    device={device}
                                    remove={removeDevice}
                                    update={updateDeviceBasket}
                                />
                            )}
                            <hr />
                            <div
                                className='d-flex justify-content-between'
                            >
                                <div className='fs-4'>Сумма: {sum}</div>
                                <Button
                                    variant='outline-dark'
                                    onClick={() => history.push(PAYMENT_ROUTE, {sum})}
                                >
                                    Оплатить
                                </Button>
                            </div>
                        </>
                :
                    <>
                        <div>В корзине нет товаров</div>
                        <Button
                            variant='outline-success'
                            onClick={() => history.push(SHOP_ROUTE)}
                        >
                            Вернуться к покупкам
                        </Button>
                    </>
            }
        </Container>
    );
};

const mapStateToProps = state => ({
    basket: state.user.basket,
})

const mapDispatchToProps = {
    removeDeviceBasket, updateDeviceBasket,setError
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket);