import React from 'react';

type StarComponentProps = {
    index: number;
    rating: number;
    hoverRating: number;
    handleRating: (index: number) => void;
    handleMouseOver: () => void;
    handleMouseLeave: () => void;
};

const StarComponent: React.FC<StarComponentProps> = ({ index, rating, hoverRating, handleRating, handleMouseOver, handleMouseLeave }) => (
    <span
        className={`star${index <= (hoverRating || rating) ? ' filled' : ''}`}
        onClick={() => handleRating(index)}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
    >
        &#9733;
    </span>
);

export default StarComponent;
