import React from 'react';
import {Button} from "react-bootstrap";

const Counter = ({count, setCount}) => {

    const minus = (e) => {
        e.stopPropagation()
        setCount( prev => {
            if (prev <= 1) {
                return prev
            }
            return prev - 1
        })
    }

    const plus = (e) => {
        e.stopPropagation()
        setCount( prev => prev + 1)
    }

    return (
        <div
            className='d-flex'
        >
            <Button
                onClick={minus}
            >
                -
            </Button>
            <div>{count}</div>
            <Button
                onClick={plus}
            >
                +
            </Button>
        </div>
    );
};

export default Counter;