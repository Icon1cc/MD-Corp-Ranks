import React, { useState } from 'react';
import '../styles/ThankYou.css';
import { subscribeToEmail } from '../services/reviewService';

const ThankYou: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isButtonDisabled = !isValidEmail(email);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuccessMessage(false);
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidEmail(email)) {
      const subscribeResponse = await subscribeToEmail(email);
      if (subscribeResponse !== undefined) {
        setShowSuccessMessage(true);
        setEmail('');
      }
    }
  };

  return (
    <div className="thank-you-container">
      <header className="header">
        <h1>JobSecrets.com</h1>
      </header>
      <div className="thank-you-modal">
        <form onSubmit={handleSubmit}>
          <h2 className="thank-you-text">Grazie per la vostra presentazione!</h2>
          <p className="project-text">Questa è la fase finale per la selezione della revisione.</p>
          {showSuccessMessage && <div className="success-message">Il tuo indirizzo email è stato iscritto con successo!</div>}
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
        </form>
      </div>
    </div>
  );
};

export default ThankYou;
