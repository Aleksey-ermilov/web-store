import React from 'react';
import { connect } from 'react-redux'
import  { Card} from "react-bootstrap";
import {selectedBrand} from "../store/device/actionDevice";

const BrandBar = ({brands, selBrand, selectedBrand}) => {
    return (
        <div className='d-flex flex-wrap'>
            {
                brands.map( brand =>
                    <Card
                        style={{cursor: 'pointer'}}
                        className='p-2 px-3 mb-1 mx-1'
                        border={brand._id === selBrand._id ? 'primary' : 'light'}
                        onClick={() => selectedBrand(brand)}
                        key={brand._id}
                    >{brand.name}</Card>
                )
            }
        </div>
    );
};
const mapStateToProps = state => ({
    brands: state.device.brands,
    selBrand: state.device.selectedBrand,
})

const mapDispatchToProps = {
    selectedBrand
}

export default connect(mapStateToProps,mapDispatchToProps)(BrandBar);