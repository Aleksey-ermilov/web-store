import React from 'react';
import { connect } from 'react-redux'
import  {ListGroup} from "react-bootstrap";

import {selectedType} from '../store/device/actionDevice'

const TypeBar = ({types, selType, selectedType, }) => {
    return (
        <ListGroup>
            {
                types.map( type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={type._id === selType._id}
                        onClick={() => selectedType(type)}
                        key={type._id}
                    >{type.name}</ListGroup.Item>
                )
            }
        </ListGroup>
    );
};

const mapStateToProps = state => ({
    types: state.device.types,
    selType: state.device.selectedType,
})

const mapDispatchToProps = {
    selectedType
}

export default connect(mapStateToProps,mapDispatchToProps)(TypeBar);