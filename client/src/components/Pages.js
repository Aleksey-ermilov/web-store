import React from 'react';
import {connect} from "react-redux";
import {Pagination} from 'react-bootstrap'

import {setPage} from "../store/device/actionDevice";

const Pages = ({totalCount,limit,page, setPage}) => {
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []
    for (let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    return (
        <Pagination className='mt-5'>
            {pages.map(p =>
                <Pagination.Item
                    key={p}
                    active={page === p}
                    onClick={() => setPage(p)}
                >
                    {p}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

const mapStateToProps = state => ({
    totalCount: state.device.totalCount,
    limit: state.device.limit,
    page: state.device.page
})

const mapDispatchToProps = {
    setPage
}

export default connect(mapStateToProps,mapDispatchToProps)(Pages);