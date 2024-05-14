import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ThankYou.css';
import WelcomeHeader from '../components/WelcomeHeader';
import ScoreContainer from '../components/ScoreContainer';
import EmailSubscriptionContainer from '../components/EmailSubscriptionContainer';
import SuccessFeedbackCountdown from '../components/SuccessFeedbackCountdown';

const ThankYou: React.FC = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmissionSuccess = () => {
        setShowSuccessMessage(true);
    };

    const handleTimeoutCompletion = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="thank-you-container">
            <WelcomeHeader />
            <div className="thank-you-modal">
                <h2 className="thank-you-text">Grazie per la tua recensione!</h2>
                <ScoreContainer />
                {!showSuccessMessage ? (
                    <EmailSubscriptionContainer
                        onSubmissionSuccess={handleEmailSubmissionSuccess}
                    />
                ) : (
                    <SuccessFeedbackCountdown onTimeout={handleTimeoutCompletion} />
                )}
            </div>
        </div>
    );
};

export default ThankYou;
