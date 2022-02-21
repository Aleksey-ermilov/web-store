import React from 'react';
import { connect } from 'react-redux'
import  {Container} from "react-bootstrap";

const WishList = ({}) => {
    return (
        <Container>
            WishList
        </Container>
    );
};

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(WishList);