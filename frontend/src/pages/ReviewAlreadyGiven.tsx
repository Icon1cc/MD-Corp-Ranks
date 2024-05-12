import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';
import EmailSubscriptionContainer from '../components/EmailSubscriptionContainer';
import SuccessFeedbackCountdown from '../components/SuccessFeedbackCountdown';
import WelcomeHeader from '../components/WelcomeHeader';

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
        <div className="error-container">
            <WelcomeHeader />
            <div className="main-content">
                <p className="error-message">
                    Spiacenti, non puoi inviare un'altra richiesta. Hai già fornito una recensione per la stessa azienda.
                </p>
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
