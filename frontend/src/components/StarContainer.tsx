import React, { useState } from 'react';
import StarComponent from './StarComponent';

type StarContainerProps = {
    rating: number;
    handleRating: (rate: number) => void;
};

const StarContainer: React.FC<StarContainerProps> = ({ rating, handleRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseOver = (rate: number) => {
        setHoverRating(rate);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(index => (
                <StarComponent
                    key={index}
                    index={index}
                    rating={rating}
                    hoverRating={hoverRating}
                    handleRating={handleRating}
                    handleMouseOver={handleMouseOver}
                    handleMouseLeave={handleMouseLeave}
                />
            ))}
        </div>
    );
};

export default StarContainer;