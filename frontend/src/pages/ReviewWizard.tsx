import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import questionService from '../services/questionService';
import userService from '../services/userService';
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
    const beforeUnloadListener = useRef<(() => void) | null>(null);

    useEffect(() => {
        const loadQuestions = async () => {
            setLoading(true);
            try {
                const data = await questionService.fetchQuestions();
                setQuestions(data.questions);
            } catch (error) {
                console.error('Error loading questions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();

        beforeUnloadListener.current = userService.setupBeforeUnloadListener();
        return () => {
            if (beforeUnloadListener.current) {
                beforeUnloadListener.current();
            }
        };
    }, []);

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        await fetch(`http://localhost:8080/api/questions/${currentQuestion.id}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
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
    if (questions.length === 0) return <div>No questions available.</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div id="root">
            <WelcomeHeader />
            <div className="review-container">
                <div className="question-card">
                    <div className="progress-circle">
                        {currentQuestionIndex + 1}/{questions.length}
                    </div>
                    <h1>Benvenuto nel questionario di recensione</h1>
                    <h2>{currentQuestion.title}</h2>
                    <p>{currentQuestion.subtitle}</p>
                    <StarContainer rating={rating} handleRating={handleRating} />
                    <button
                        className="review-input-form submit-button"
                        disabled={rating === 0}
                        onClick={handleSubmit}
                        style={{ marginLeft: '20px' }}
                    >
                        Invia
                    </button>

                    <p className="review-note">Una volta inviata la valutazione per questa domanda, non è più possibile modificarla.</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewWizard;