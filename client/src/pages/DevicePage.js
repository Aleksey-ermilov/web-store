import React, {useState,useEffect} from 'react';
import {Container, Col, Image, Row, Card, Button} from "react-bootstrap";
import {useParams} from 'react-router-dom'

import {fetchOneDeviceAPI} from "../http/deviceAPI";

import BigStar from '../assets/BigStar.png'
import Loading from "../components/Loading";
import Star from "../components/svg/Star";
import StarOutline from "../components/svg/StarOutline";
import Rating from "../components/Rating";

const DevicePage = () => {
    const [isLoading, setIsLoading] = useState(true)

    const {id} = useParams()
    const [device, setDevice] = useState({info: []})

    useEffect(() => {
        fetchOneDeviceAPI(id).then(data => setDevice({...data.device, info: data.info}))
            .finally(() => setIsLoading(false))
    },[])

    if (isLoading){
        return <Loading />
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image height={300} width={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{background: `url(${BigStar}) no-repeat center center`, width:240, height:240, backgroundSize:'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width:300, height: 300, fontSize:32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant='outline-dark'>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column mt-3'>
                <h2>Характеристики</h2>
                <Rating rating={device.rating} />
                {
                    device.info.map( (info, index) =>
                        <Row
                            key={info._id}
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding:10}}
                        >
                            {info.title}: {info.description}
                        </Row>
                    )
                }
            </Row>
        </Container>
    );
};

export default DevicePage;
