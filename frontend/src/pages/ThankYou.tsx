import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/ThankYou.css';
import { subscribeToEmail } from '../services/reviewService';
import userService from '../services/userService';
import WelcomeHeader from '../components/WelcomeHeader';
import { useNavigate } from 'react-router-dom';

const getColor = (score: number) => {
    if (score >= 90) return '#2196F3'; // blue
    if (score >= 75) return '#4CAF50'; // green
    if (score >= 50) return '#FFEB3B'; // yellow
    if (score >= 25) return '#FF9800'; // orange
    return '#F44336'; // red
};

const ThankYou: React.FC = () => {
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isButtonDisabled = !isValidEmail(email) || showSuccessMessage;

    useEffect(() => {
        const fetchTotalScore = async () => {
            setIsLoading(true);
            try {
                const score = await userService.getTotalScore();
                setTotalScore(parseFloat(score));
                if (isNaN(parseFloat(score))) {
                    throw new Error('Invalid score value');
                }
            } catch (error) {
                console.error('Error getting total score:', error);
                setTotalScore(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalScore();

        const cleanup = userService.setupBeforeUnloadListener();
        return () => cleanup();
    }, []);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isValidEmail(email)) {
            const subscribeResponse = await subscribeToEmail(email);
            if (subscribeResponse.success) {
                setShowSuccessMessage(true);
                setEmail('');
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 2000);
            }
        }
    };

    return (
        <div className="thank-you-container">
            <div id="root">
                <WelcomeHeader />
                <div className="thank-you-modal">
                    <h2 className="thank-you-text">Thank you for your review!</h2>
                    {isLoading ? (
                        <div>Loading your total score...</div>
                    ) : totalScore !== null ? (
                        <div className="score-container">
                            <p className="score-label">Evaluation score:</p>
                            <div style={{ width: 200, height: 200, margin: 'auto' }}>
                                <CircularProgressbar
                                    value={totalScore}
                                    text={`${totalScore}%`}
                                    styles={buildStyles({
                                        pathColor: getColor(totalScore),
                                        textColor: getColor(totalScore),
                                    })}
                                />
                            </div>
                        </div>
                    ) : (
                        <p>Your score is unavailable.</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="email-section">
                            <p className="interest-text">If you are interested in following the community, please leave your email!</p>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="user@example.com"
                                className="email-input"
                            />
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isButtonDisabled}
                            >
                                Subscribe
                            </button>
                        </div>
                        {showSuccessMessage && <div className="success-message">Your email has been successfully subscribed!</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
