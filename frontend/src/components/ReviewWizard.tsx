import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

type Question = {
  id: number;
  title: string;
  subtitle: string;
};

const ReviewWizard = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions); 
        setLoading(false);
      });
  }, []);

  const handleRating = async (rating: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    await fetch(`/api/questions/${currentQuestion.id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.title}</h2>
      <p>{currentQuestion.subtitle}</p>
      {/* Here you should have your rating component instead of a button */}
      <button onClick={() => handleRating(5)}>Rate 5 Stars</button>
    </div>
  );
};

export default ReviewWizard;
