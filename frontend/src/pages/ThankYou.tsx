import React, { useState, useEffect } from 'react';
import '../styles/ThankYou.css';
import { subscribeToEmail } from '../services/reviewService';
import userService from '../services/userService'; 

const ThankYou: React.FC = () => {
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [totalScore, setTotalScore] = useState<string | null>(null);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isButtonDisabled = !isValidEmail(email) || showSuccessMessage;

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

    useEffect(() => {
        const fetchTotalScore = async () => {
            const score = await userService.getTotalScore();
            setTotalScore(score); 
        };

        fetchTotalScore();
    }, []);

    return (
        <div className="thank-you-container">
            <header className="header">
                <h1>JobSecrets.com</h1>
            </header>
            <div className="thank-you-modal">
                {totalScore !== null ? (
                    <div className="total-score-display">
                        <h2 className="thank-you-text">Grazie per la tua recensione!</h2>
                        <p className="total-score-text">
                            Il punteggio totale della tua valutazione è: {totalScore}
                        </p>
                    </div>
                ) : (
                    <div className="loading-score">Caricamento del punteggio totale...</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="email-section">
                        <p className="interest-text">Se sei interessato a seguire la community lascia la tua email!</p>
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
                            Invia
                        </button>
                    </div>
                    {showSuccessMessage && <div className="success-message">Il tuo indirizzo email è stato iscritto con successo!</div>}
                </form>
            </div>
        </div>
    );
};

export default ThankYou;
