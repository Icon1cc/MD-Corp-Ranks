import React, { useState } from 'react';
import { subscribeToEmail } from '../services/reviewService';

interface EmailSubscriptionContainerProps {
    onSubmissionSuccess: () => void;
}

const EmailSubscriptionContainer: React.FC<EmailSubscriptionContainerProps> = ({ onSubmissionSuccess }) => {
    const [email, setEmail] = useState('');

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isButtonDisabled = !isValidEmail(email);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isValidEmail(email)) {
            const subscribeResponse = await subscribeToEmail(email);
            if (subscribeResponse.success) {
                onSubmissionSuccess();
                setEmail('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="email-section">
                <p className="interest-text">Se sei interessato a seguire la comunità, lascia la tua email!</p>
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
                    Sottoscrivi
                </button>
            </div>
        </form>
    );
};

export default EmailSubscriptionContainer;