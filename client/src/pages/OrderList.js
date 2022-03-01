import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import {Button, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import {getOrderList} from "../http/userAPI";

import Loading from "../components/Loading";
import OrderListCard from "../components/OrderListCard";

import {SHOP_ROUTE} from "../utils/consts";



const OrderList = ({}) => {
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(true)
    const [orderList, setOrderList] = useState([])

    useEffect(()=>{
        getOrderList().then(data => setOrderList(data))
            .finally(() => setIsLoading(false))
    },[getOrderList])

    if (isLoading){
        return <Loading />
    }

    return (
        <Container>
            {
                orderList.length ?
                    orderList.map(order =>
                        <OrderListCard
                            order={order}
                            key={order._id}
                        />
                    )
                    :
                    <>
                        <div>Вы ещё не делали заказов</div>
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
    user: state.user.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(OrderList);