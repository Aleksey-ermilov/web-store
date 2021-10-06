import React from 'react';
import StarRatings from "react-star-ratings";

const Rating = ({rating,onChange}) => {

    const ratingChanged = (newRating) => {
        onChange(newRating)
    };

    return (

            <StarRatings
                rating={Number(rating)}
                starRatedColor="#ffb703"
                changeRating={ratingChanged}
                name='rating'
                starDimension="30px"
            />

    );
};

export default Rating;