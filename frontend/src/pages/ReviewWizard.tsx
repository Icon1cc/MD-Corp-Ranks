import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import questionService from '../services/questionService';
import '../styles/reviewWizard.css';
import WelcomeHeader from '../components/WelcomeHeader';
import StarContainer from '../components/StarContainer';

type Question = {
    id: number;
    title: string;
    subtitle: string;
};

const ReviewWizard: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await questionService.fetchQuestions();
                setQuestions(data.questions);
                setLoading(false);
            } catch (error) {
                console.error('Error loading questions:', error);
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    const handleRating = async (rate: number) => {
        setRating(rate);
    };
    const handleSubmit = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        await fetch(`/api/questions/${currentQuestion.id}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: rating }),
            credentials: 'include'
        });

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setRating(0);
        } else {
            navigate('/thank-you');
        }
    };

    if (loading) return <Loader />;
    if (questions.length === 0) return <Loader />;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div id="root">
            <WelcomeHeader />
            <div className="review-container">
                <div className="question-card">
                    <div className="progress-circle">
                        {currentQuestionIndex + 1}/{questions.length}
                    </div>
                    <h1>Welcome to the Review Section</h1>
                    <h2>{currentQuestion.title}</h2>
                    <p>{currentQuestion.subtitle}</p>
                    <StarContainer rating={rating} handleRating={handleRating} />
                    <button
                        className="review-input-form submit-button"
                        disabled={rating === 0}
                        onClick={handleSubmit}
                        style={{ marginLeft: '20px' }}
                    >
                        Submit
                    </button>

                    <p className="review-note">Once the review is submitted for this question, it cannot be changed.</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewWizard;