import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ThankYou.css'; 
import WelcomeHeader from '../components/WelcomeHeader';
import EmailSubscriptionContainer from '../components/EmailSubscriptionContainer';
import SuccessFeedbackCountdown from '../components/SuccessFeedbackCountdown';

const ReviewAlreadyGiven: React.FC = () => {
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
                <h2 className="thank-you-text">Spiacenti, non puoi inviare un'altra richiesta. Hai già dato una recensione.</h2>
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

export default ReviewAlreadyGiven;
