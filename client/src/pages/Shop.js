import React, {useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap'
import {connect} from "react-redux";

import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";

import {fetchTypeAPI,fetchBrandAPI,fetchDeviceAPI} from "../http/deviceAPI";
import {setBrand, setType, setDevice,setTotalCount} from "../store/device/actionDevice";

import {setError} from "../store/user/actionUser";

const Shop = ({setType,setBrand, setDevice,setTotalCount,selectedBrand,selectedType,page,setError}) => {

    useEffect(() => {
        fetchTypeAPI().then( data => setType(data) ).catch(e => setError(e.response.data.message))
        fetchBrandAPI().then( data => setBrand(data) ).catch(e => setError(e.response.data.message))
    },[])

    useEffect(() => {
        const selType = selectedType._id ? selectedType._id : null
        const selBrand = selectedBrand._id ? selectedBrand._id : null
        fetchDeviceAPI(selType,selBrand,page,10).then( data => {
            setDevice(data.devices)
            setTotalCount(data.totalCount)
        })
            .catch(e => setError(e.response.data.message))
    },[page,selectedType,selectedBrand])

    return (
        <Container className='mt-2'>
            <Row>
                <Col md={3} className='mt-5'>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    isAuth: state.user.isAuth,
    selectedBrand: state.device.selectedBrand,
    selectedType: state.device.selectedType,
    page: state.device.page
})

const mapDispatchToProps = {
    setType, setBrand, setDevice,setTotalCount,setError
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop);