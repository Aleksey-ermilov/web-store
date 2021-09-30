import React from 'react';
import { connect } from 'react-redux'
import  {Row} from "react-bootstrap";

import DeviceItem from "./DeviceItem";

const DeviceList = ({devices}) => {
    return (
        <Row>
            {
                devices.map( device =>
                    <DeviceItem
                        key={device._id}
                        device={device}
                    />
                )
            }
        </Row>
    );
};
const mapStateToProps = state => ({
    devices: state.device.devices,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(DeviceList);