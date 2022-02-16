import React from 'react';
import {Modal, Button} from "react-bootstrap";
import Icon from "../IconSuccess";

const SuccessBuy = ({show,onHide}) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='sm'
            centered
        >
            <Modal.Body>
                <div className='d-flex justify-content-center align-items-center'>
                    <Icon />
                </div>
            </Modal.Body>
            <Modal.Footer >
                <Button variant='outline-success' onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessBuy;