import React, {useState,useEffect} from 'react';
import {Container, Col, Image, Row, Card, Button} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

import {fetchOneDeviceAPI} from "../http/deviceAPI";
import { ratingAPI } from "../http/deviceAPI"

import { addDeviceBasket, updateDeviceBasket,setError } from "../store/user/actionUser";

import Loading from "../components/Loading";
import Rating from "../components/Rating";
import Counter from "../components/Counter";

const DevicePage = ({user,basket,addDeviceBasket,updateDeviceBasket,setError}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(1)

    const {id} = useParams()
    const [device, setDevice] = useState({info: []})

    useEffect(() => {
        fetchOneDeviceAPI(id).then(data => setDevice({...data.device, info: data.info}))
            .catch(e => setError(e.response.data.message))
            .finally(() => setIsLoading(false))
    },[])

    const addBasket = (device) => {
        const bDev = basket.find(dev => dev._id === device._id)
        if (bDev){
            updateDeviceBasket({...bDev, count: bDev.count + count})
        }else {
            addDeviceBasket({...device, count})
        }
        setCount(1)
    }

    const changeRating = (rating) => {
        ratingAPI(rating,id,user._id)
            .then(data => setDevice( prev => ({ ...prev, rating: data.average }) ) )
            .catch(e => setError(e.response.data.message))
    }

    if (isLoading){
        return <Loading />
    }

    return (
        <Container className='mt-3'>
            <Row className='mb-2'>
                <h1>
                    {device.name}
                </h1>
            </Row>
            <Row>
                <Col md={4}>
                    <Image height={300} width={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width:300, height: 300, fontSize:32, border: '5px solid lightgray'}}
                    >
                        <h3>????: {device.price} ??????.</h3>
                        <Counter
                            count={count}
                            setCount={setCount}
                        />
                        <Button
                            variant='outline-dark'
                            onClick={() => addBasket(device)}
                        >
                            ???????????????? ?? ??????????????
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className='mb-5 mt-3' >
                <div className='fs-4' >?????????????? ?????? ??????????!</div>
                <Rating rating={device.rating} onChange={changeRating} />
            </Row>
            <Row className='d-flex flex-column mt-3'>
                {
                    !!device.info.length && <>
                        <h2>????????????????????????????</h2>

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
                    </>

                }
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    user: state.user.user,
    basket: state.user.basket
})

const mapDispatchToProps = {
    addDeviceBasket, updateDeviceBasket,setError
}

export default connect(mapStateToProps,mapDispatchToProps)(DevicePage);
