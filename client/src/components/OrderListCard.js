import React, {useState} from 'react';
import {Card, Image, ListGroup, ListGroupItem} from "react-bootstrap";

const OrderListCard = ({order}) => {
    const [isShow, setIsShow] = useState(false)

    const option = { year: 'numeric', month: 'long', day: 'numeric' }

    return (
        <Card
            className='mt-3 p-2'
            style={{cursor: 'pointer'}}
            onClick={ () => setIsShow(prev => !prev) }
        >
            <Card.Body>
                <Card.Title>{new Date(order.date).toLocaleDateString('ru-RU',option)}</Card.Title>
                <Card.Text>
                    Потрачено: { order.devices.reduce((partial_sum, a) => partial_sum + (Number(a.device.price)* +a.count),0) }
                </Card.Text>
                <Card.Text>
                    Количество товара: { order.devices.reduce((partial_sum, a) => partial_sum + +a.count,0) }
                </Card.Text>
            </Card.Body>

            {
                isShow &&
                <ListGroup className="list-group-flush">
                    {
                        order.devices.map(device =>
                            <ListGroupItem className='d-flex ' key={device.device._id}>
                                <Image
                                    style={{cursor: 'pointer'}}
                                    width={70}
                                    height={70}
                                    src={ process.env.REACT_APP_API_URL + device.device.img}
                                />
                                <div className='d-flex justify-content-between w-100 ms-2'>
                                    <div className='d-flex flex-column justify-content-around' >
                                        <div>{device.device.name}</div>
                                        <div>Количество товара: {device.count}</div>
                                    </div>
                                    <div className='d-flex align-items-center' >
                                        <div>{ +device.device.price * device.count} руб.</div>
                                    </div>
                                </div>
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            }
        </Card>
    );
};

export default OrderListCard;