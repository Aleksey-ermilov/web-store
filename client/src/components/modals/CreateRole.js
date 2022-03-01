import React, {useState} from 'react';
import {Modal, Button, Form} from "react-bootstrap";

const CreateRole = ({show,onHide,addRole}) => {
    const [value, setValue] = useState('')

    const handlerBtn = () => {
        addRole(value.toUpperCase())
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
                     Создать роль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={ e => setValue(e.target.value)}
                        placeholder={'Введите название роли'}
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

export default CreateRole;