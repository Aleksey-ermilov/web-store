import React, {useState} from 'react';
import  {Container, Button} from "react-bootstrap";

import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [ isBrandVisible, setIsBrandVisible ] = useState(false)
    const [ isTypeVisible, setIsTypeVisible ] = useState(false)
    const [ isDeviceVisible, setIsDeviceVisible ] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateDevice show={isDeviceVisible} onHide={() => setIsDeviceVisible(false)}/>
            <CreateType show={isTypeVisible} onHide={() => setIsTypeVisible(false)}/>
            <CreateBrand show={isBrandVisible} onHide={() => setIsBrandVisible(false)}/>
        </Container>
    );
};

export default Admin;