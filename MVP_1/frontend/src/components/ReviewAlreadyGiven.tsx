import React from 'react';
import '../styles/Error.css';

const ReviewAlreadyGiven: React.FC = () => (
    <div className="error-container">
        <div className="header">
            <h1>JobSecrets.com</h1>
        </div>
        <div className="main-content">
            <p className="error-message">
                Spiacenti, non puoi inviare un'altra richiesta. Hai già dato una recensione.
            </p>
        </div>
    </div>
);

export default ReviewAlreadyGiven;
