import React, { useState, useEffect } from 'react';
import Preferences from '../components/Preferences';
import Loader from '../components/Loader';
import ReviewAlreadyGiven from '../components/ReviewAlreadyGiven';
import userService from '../services/userService';
import preferencesService from '../services/preferencesService';
import { trackReviewSubmission } from '../services/reviewService';
import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';
import '../styles/Loader.css';

const Home: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [reviewAlreadyGiven, setReviewAlreadyGiven] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    setLoading(true);
    try {
      const data = await userService.checkUserStatus();
      setUserId(data.userId);
      setReviewAlreadyGiven(data.reviewAlreadyGiven);
    } catch (error) {
      setError('There was an error fetching user status.');
      console.error('Error during user status check:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async (identityPreference: string, reviewPreference: string) => {
    try {
      await preferencesService.savePreferences(userId, identityPreference, reviewPreference);
    } catch (error) {
      setError('There was an error saving your preferences.');
      console.error('Error making API call:', error);
    }
  };

  const handleProceed = async () => {
    const trackResponse = await trackReviewSubmission();
    if (trackResponse.success) {
      navigate('/thank-you');
    } else {
      setError('Failed to track review submission.');
    }
  };

  let content;
  if (reviewAlreadyGiven) {
    content = <ReviewAlreadyGiven />;
  } else {
    content = <Preferences savePreferences={handleSavePreferences} onProceed={handleProceed} />;
  }

  return (
    <div className={`content ${loading ? 'blurred' : ''}`}>
      {error && <div className="error-message">{error}</div>}
      {loading ? <Loader /> : content}
    </div>
  );
};

export default Home;
