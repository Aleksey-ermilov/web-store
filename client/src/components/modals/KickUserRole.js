import React, {useState} from 'react';
import {Modal, Button, Dropdown} from "react-bootstrap";

const KickUserRole = ({show,onHide,users,kickRole}) => {

    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)

    const handlerBtn = () => {
        kickRole(user._id,role)
        setUser(null)
        setRole(null)
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
                    Забрать роль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='my-2'>
                    <Dropdown.Toggle>{user?.name || 'Выберите пользователя'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            users.map( user =>
                                <Dropdown.Item key={user._id} onClick={() => setUser(user)} >{user.name}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                {
                    user &&
                    <Dropdown className='my-2'>
                    <Dropdown.Toggle>{role || 'Выберите роль'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            user.roles.map(role =>
                                <Dropdown.Item key={role} onClick={() => setRole(role)}>{role}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button
                    variant='outline-success'
                    onClick={handlerBtn}
                >Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default KickUserRole;