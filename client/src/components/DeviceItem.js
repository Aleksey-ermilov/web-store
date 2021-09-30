import React from 'react';
import {Col, Card, Image} from "react-bootstrap";
import {useHistory} from 'react-router-dom'

import star from '../assets/star-outline.svg'
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} onClick={() => history.push(`${DEVICE_ROUTE}/${device._id}`)}>
            <Card style={{cursor:'pointer', width: '150px'}} className='mb-2 mt-3' border={'light'}>
                <Image width={150} height={150} src={ process.env.REACT_APP_API_URL + device.img}/>
                <div className='d-flex justify-content-between align-items-center mt-1 text-black-50'>
                    <div>Apple...</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;