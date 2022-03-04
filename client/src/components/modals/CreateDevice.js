import React, {useState} from 'react';
import {Button, Form, Modal, Dropdown, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";

const CreateDevice = ({show,onHide, types, brands,addDevice}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [type, setType] = useState(null)
    const [brand, setBrand] = useState(null)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (id) => {
        setInfo(info.filter( i => i.number !== id ))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const handlerBtn = () => {
        const formData = new FormData()
        formData.append('name',name)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('brandId',brand._id)
        formData.append('typeId',type._id)
        formData.append('info',JSON.stringify(info))

        addDevice(formData)

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
                    <Dropdown className='my-2'>
                        <Dropdown.Toggle>{type?.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                types.filter( t => t._id !== 0).map( type =>
                                    <Dropdown.Item key={type._id} onClick={() => setType(type)} >{type.name}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='my-2'>
                        <Dropdown.Toggle>{brand?.name || 'Выберите бранд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                brands.filter( b => b._id !== 0).map( brand =>
                                    <Dropdown.Item key={brand._id} onClick={() => setBrand(brand)} >{brand.name}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder={'Введите название устройства'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder={'Введите стоимость устройства'}
                        onChange={e => Number(setPrice(e.target.value))}
                        value={price}
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type={'file'}
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant='outline-dark'
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {
                        info.map( i =>
                            <Row className='mt-3' key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={e => changeInfo('title',e.target.value, i.number)}
                                        placeholder={'Введите название свойства'}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={e => changeInfo('description',e.target.value, i.number)}
                                        placeholder={'Введите описание свойства'}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => removeInfo(i.number)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={handlerBtn}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};
const mapStateToProps = state => ({
    types: state.device.types,
    brands: state.device.brands
})

const mapDispatchToProps = {
    // selectedBrand, selectedType
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateDevice);