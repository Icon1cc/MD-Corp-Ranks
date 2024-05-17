import React from 'react';

interface ProgressCircleProps {
    currentQuestionIndex: number;
    totalQuestions: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ currentQuestionIndex, totalQuestions }) => (
    <div className="progress-circle">
        {currentQuestionIndex + 1}/{totalQuestions}
    </div>
);

export default ProgressCircle;
