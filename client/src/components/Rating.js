import React from 'react';
import StarOutline from "./svg/StarOutline";
import Star from "./svg/Star";

const Rating = ({rating}) => {

    const star =  3 //Math.floor(10/rating)
    const starOutline = 5 - star
    let arrayStar = []
    let arrayStarOutline = []

    for(let i = 0; i < star; i++){
        arrayStar[i] = {Component: <Star />}
    }
    for(let i = 0; i < starOutline; i++){
        arrayStarOutline[i] = {Component: <StarOutline />}
    }


    return (
        <div
            className='d-flex'
        >
            {
                arrayStar.map( (stat, index) => stat.Component )
            }
            {
                arrayStarOutline.map( (stat, index) => stat.Component )
            }
        </div>
    );
};

export default Rating;