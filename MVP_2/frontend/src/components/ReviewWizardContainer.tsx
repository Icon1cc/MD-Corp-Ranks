import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import questionService from '../services/questionService';
import userService from '../services/userService';
import ProgressCircle from '../components/ProgressCircle';
import QuestionCard from '../components/QuestionCard';
import WelcomeHeader from '../components/WelcomeHeader';
import { trackReviewSubmission } from '../services/reviewService';
import '../styles/reviewWizard.css';

type Question = {
    id: number;
    title: string;
    subtitle: string;
};

const ReviewWizardContainer: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const beforeUnloadListener = useRef<(() => void) | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userStatus = await userService.checkUserStatus();
                if (userStatus.reviewAlreadyGiven) {
                    navigate('/review-already-given');
                    return;
                }

                const data = await questionService.fetchQuestions();
                setQuestions(data.questions);
            } catch (error) {
                console.error('Error during data fetching:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        beforeUnloadListener.current = userService.setupBeforeUnloadListener();
        return () => {
            if (beforeUnloadListener.current) {
                beforeUnloadListener.current();
            }
        };
    }, [navigate]);

    const handleSubmit = async (rating: number) => {
        const currentQuestion = questions[currentQuestionIndex];
        await questionService.submitRating(currentQuestion.id, rating);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const trackResponse = await trackReviewSubmission();
            if (trackResponse.success) {
                navigate('/thank-you');
            } else {
                console.error('Failed to track review submission.');
            }
        }
    };

    if (loading) return <Loader />;
    if (questions.length === 0) return <Loader />;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div id="root">
            <WelcomeHeader />
            <div className="review-container">
                <ProgressCircle currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
                <QuestionCard
                    question={currentQuestion}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default ReviewWizardContainer;
