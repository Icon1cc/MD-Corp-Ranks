import React from 'react';
import { subscribeToEmail } from '../services/reviewService';

const EmailSubscriptionContainer: React.FC<{ email: string; setEmail: (email: string) => void; onSubmissionSuccess: () => void; }> = ({ email, setEmail, onSubmissionSuccess }) => {
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
            }
        }
    };

    return (
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
        </form>
    );
};

export default EmailSubscriptionContainer;