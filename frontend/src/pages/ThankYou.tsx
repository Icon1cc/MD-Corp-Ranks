import React, { useState, useEffect } from 'react';
import '../styles/ThankYou.css';
import { subscribeToEmail } from '../services/reviewService';
import userService from '../services/userService';
import WelcomeHeader from '../components/WelcomeHeader';

const ThankYou: React.FC = () => {
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [totalScore, setTotalScore] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isButtonDisabled = !isValidEmail(email) || showSuccessMessage;

    useEffect(() => {
        const fetchTotalScore = async () => {
            setIsLoading(true);
            try {
                const score = await userService.getTotalScore();
                setTotalScore(score);
            } catch (error) {
                console.error('Error getting total score:', error);
                setTotalScore('Unavailable');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalScore();

        // Setup the beforeunload listener
        const cleanup = userService.setupBeforeUnloadListener();
        return () => cleanup();  // Cleanup the listener when component unmounts
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
            }
        }
    };

    return (
        <div className="thank-you-container">
            <div id="root">
                <WelcomeHeader />
                <div className="thank-you-modal">
                    {isLoading ? (
                        <div className="loading-score">Loading your total score...</div>
                    ) : (
                        <div className="total-score-display">
                            <h2 className="thank-you-text">Thank you for your review!</h2>
                            <p className="total-score-text">
                                Your total evaluation score is: {totalScore}
                            </p>
                        </div>
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
