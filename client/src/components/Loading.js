import React from 'react';
import {Container, Spinner} from "react-bootstrap";

const Loading = () => {
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Spinner animation='grow' />
        </Container>
    );
};

export default Loading;