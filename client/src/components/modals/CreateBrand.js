import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const CreateBrand = ({show,onHide,addBrand}) => {
    const [value, setValue] = useState('')

    const handlerBtn = () => {
        addBrand(value)
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
                    Добавить бренд
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

export default CreateBrand;