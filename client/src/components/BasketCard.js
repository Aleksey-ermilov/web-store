import React, {useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";

import {Card, Button, Image} from "react-bootstrap";
import {DEVICE_ROUTE} from "../utils/consts";
import Counter from "./Counter";

const BasketCard = ({device,remove,update}) => {
    const history = useHistory()

    const [count, setCount] = useState(device.count)

    useEffect( () => {
        update({...device, count})
    }, [count])

    const removeItem = (e) => {
        e.stopPropagation()
        remove(device._id)
    }

    return (
        <Card
            className='mt-3 p-2 '


        >
            <div
                className='d-flex fs-4'
            >
                <Image
                    style={{cursor: 'pointer'}}
                    onClick={() => history.push(`${DEVICE_ROUTE}/${device._id}`)}
                    width={70}
                    height={70}
                    src={ process.env.REACT_APP_API_URL + device.img}
                />
                <div className='d-flex justify-content-between w-100 ms-2'>
                    <div>{device.name}</div>
                    <div
                        className='d-flex align-items-center'
                    >
                        <Counter
                            count={count}
                            setCount={setCount}
                        />
                        <div>{ +device.price * count} руб.</div>
                        <Button
                            className='ms-5'
                            variant='outline-danger'
                            onClick={removeItem}
                        >
                            X
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BasketCard;