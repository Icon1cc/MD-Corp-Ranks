import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import questionService from '../services/questionService';
import '../styles/reviewWizard.css';
import WelcomeHeader from './WelcomeHeader';

type Question = {
  id: number;
  title: string;
  subtitle: string;
};

const ReviewWizard: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await questionService.fetchQuestions();
        setQuestions(data.questions);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleRating = async (rate: number) => {
    setRating(rate);
    const currentQuestion = questions[currentQuestionIndex];
    await fetch(`/api/questions/${currentQuestion.id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: rate }),
    });

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      navigate('/thank-you');
    }
  };

  if (loading) {
    return <Loader />;
  }

  const handleMouseOver = (rate: number) => {
    setHoverRating(rate);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  if (questions.length === 0) return <Loader />;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div id="root">
      <WelcomeHeader />
      <div className="review-container">
        <div className="question-card">
          <h1>Welcome to the Review Section</h1>
          <h2>{currentQuestion.title}</h2>
          <p>{currentQuestion.subtitle}</p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(index => (
              <span
                key={index}
                className={`star${index <= (hoverRating || rating) ? ' filled' : ''}`}
                onClick={() => handleRating(index)}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
              >&#9733;</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewWizard;
