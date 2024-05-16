import React from 'react';
import StarContainer from './StarContainer';

interface Question {
    id: number;
    title: string;
    subtitle: string;
}

interface QuestionCardProps {
    question: Question;
    rating: number;
    handleRating: (rate: number) => void;
    handleSubmit: () => void;
    isSubmitDisabled: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, rating, handleRating, handleSubmit, isSubmitDisabled }) => (
    <div className="question-card">
        <h1>Benvenuto nel questionario di recensione</h1>
        <h2>{question.title}</h2>
        <p>{question.subtitle}</p>
        <StarContainer rating={rating} handleRating={handleRating} />
        <button
            className="review-input-form submit-button"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            style={{ marginLeft: '20px' }}
        >
            Invia
        </button>
        <p className="review-note">Una volta inviata la valutazione per questa domanda, non è più possibile modificarla.</p>
    </div>
);

export default QuestionCard;
