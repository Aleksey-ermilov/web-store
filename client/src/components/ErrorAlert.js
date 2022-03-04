import React from 'react';
import  {Container,Alert} from "react-bootstrap";

const ErrorAlert = ({error,setError}) => {

    const handlerError = () => {
        setTimeout(() => {
            setError(null)
        },2000)
    }

    return (
        <Container className='mt-2 position-absolute' style={{zIndex:5}}>
            <Alert show={error} variant="danger" onClose={handlerError()}>
                <Alert.Heading>Ошибка!</Alert.Heading>
                <p>
                    {error}
                </p>
            </Alert>
        </Container>
    );
};

export default ErrorAlert;