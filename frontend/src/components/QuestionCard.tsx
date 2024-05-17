import React, { useState } from 'react';
import StarContainer from './StarContainer';

interface Question {
    id: number;
    title: string;
    subtitle: string;
}

interface QuestionCardProps {
    question: Question;
    handleSubmit: (rating: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, handleSubmit }) => {
    const [rating, setRating] = useState(0);

    const onSubmit = () => {
        handleSubmit(rating);
    };

    return (
        <div className="question-card">
            <h1>Benvenuto nel questionario di recensione</h1>
            <h2>{question.title}</h2>
            <p>{question.subtitle}</p>
            <StarContainer rating={rating} handleRating={setRating} />
            <button
                className="review-input-form submit-button"
                disabled={rating === 0}
                onClick={onSubmit}
                style={{ marginLeft: '20px' }}
            >
                Invia
            </button>
            <p className="review-note">Una volta inviata la valutazione per questa domanda, non è più possibile modificarla.</p>
        </div>
    );
};

export default QuestionCard;
