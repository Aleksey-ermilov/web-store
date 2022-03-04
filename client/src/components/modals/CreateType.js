import React, {useState} from 'react';
import {Modal, Button, Form} from "react-bootstrap";

const CreateType = ({show,onHide,addType}) => {
    const [value, setValue] = useState('')

    const handlerBtn = () => {
        addType(value)
        setValue('')
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcentere'>
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={ e => setValue(e.target.value)}
                        placeholder={'Введите название типа'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={handlerBtn}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;