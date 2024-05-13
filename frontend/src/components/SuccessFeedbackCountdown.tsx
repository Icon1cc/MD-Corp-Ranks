import React, { useEffect, useState } from 'react';

const SuccessFeedbackCountdown: React.FC<{ onTimeout: () => void; }> = ({ onTimeout }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            onTimeout();
        }
    }, [countdown, onTimeout]);

    return (
        <div className="success-message">
            L'iscrizione è andata a buon fine! Reindirizzamento alla pagina iniziale tra {countdown} secondi...
        </div>
    );
};

export default SuccessFeedbackCountdown;