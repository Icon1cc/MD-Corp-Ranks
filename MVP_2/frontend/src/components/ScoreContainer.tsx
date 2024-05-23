import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import userService from '../services/userService';

const ScoreContainer: React.FC = () => {
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getColor = (score: number) => {
        if (score >= 90) return '#2196F3'; // blue
        if (score >= 75) return '#4CAF50'; // green
        if (score >= 50) return '#FFEB3B'; // yellow
        if (score >= 25) return '#FF9800'; // orange
        return '#F44336'; // red
    };

    useEffect(() => {
        const fetchTotalScore = async () => {
            setIsLoading(true);
            try {
                const score = await userService.getTotalScore();
                const numericScore = parseFloat(score);
                if (isNaN(numericScore)) {
                    throw new Error('Invalid score value');
                }
                setTotalScore(numericScore);
            } catch (error) {
                console.error('Error getting total score:', error);
                setTotalScore(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalScore();
    }, []);

    return isLoading ? (
        <div>Caricamento del punteggio totale...</div>
    ) : totalScore !== null ? (
        <div className="score-container" style={{ paddingBottom: '20px' }}>
            <p className="score-label" style={{ fontWeight: 'bold', fontSize: '18px' }}>Valutazione finale:</p>
            <div style={{ width: 200, height: 200, margin: 'auto' }}>
                <CircularProgressbar
                    value={totalScore}
                    text={`${totalScore}%`}
                    styles={buildStyles({
                        pathColor: getColor(totalScore),
                        textColor: getColor(totalScore),
                        textSize: '16px'
                    })}
                />
            </div>
        </div>
    ) : (
        <p>Il tuo punteggio non è disponibile.</p>
    );
};

export default ScoreContainer;
