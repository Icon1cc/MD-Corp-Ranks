import React, { useState } from 'react';
import '../styles/ThankYou.css';
import WelcomeHeader from '../components/WelcomeHeader';
import EmailSubscriptionContainer from '../components/EmailSubscriptionContainer';
import ScoreContainer from '../components/ScoreContainer';

const ReviewAlreadyGiven: React.FC = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleEmailSubmissionSuccess = () => {
        setShowSuccessMessage(true);
    };

    return (
        <div className="thank-you-container">
            <WelcomeHeader />
            <div className="thank-you-modal">
                <h2 className="thank-you-text">Spiacenti, non puoi inviare un'altra richiesta. Hai già dato una recensione.</h2>
                <ScoreContainer />
                {!showSuccessMessage ? (
                    <EmailSubscriptionContainer
                        onSubmissionSuccess={handleEmailSubmissionSuccess}
                    />
                ) : (
                    <p className="success-message">Iscrizione email avvenuta con successo!</p>
                )}
            </div>
        </div>
    );
};

export default ReviewAlreadyGiven;
