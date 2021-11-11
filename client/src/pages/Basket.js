import React from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import  {Container, Button} from "react-bootstrap";

import {removeDeviceBasket, updateDeviceBasket } from "../store/user/actionUser";

import BasketCard from "../components/BasketCard";
import {SHOP_ROUTE} from "../utils/consts";


const Basket = ({basket, removeDeviceBasket,updateDeviceBasket}) => {

    const history = useHistory()

    const removeDevice = id => {
        removeDeviceBasket(id)
    }

    return (
        <Container>
            {
                basket.length ?
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
                                <div className='fs-4'>Сумма: 777</div>
                                <Button
                                    variant='outline-dark'
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
    removeDeviceBasket, updateDeviceBasket
}

export default connect(mapStateToProps,mapDispatchToProps)(Basket);