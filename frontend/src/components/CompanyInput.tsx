import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import WelcomeHeader from './WelcomeHeader';
import { useNavigate } from 'react-router-dom';
import { submitCompany } from '../services/companyService';
import '../styles/App.css';

interface CompanyInputProps {
  onCompanyNameSubmit: (companyName: string) => Promise<void>;
  onCompanyNameChange: (companyName: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ onCompanyNameSubmit, onCompanyNameChange }) => {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Debounced function for temporary content
  const debouncedOnChange = useCallback(debounce((name: string) => {
    onCompanyNameChange(name);
  }, 500), [onCompanyNameChange]);

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCompanyName(name);
    debouncedOnChange(name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (companyName.trim() !== '') {
      try {
        const { success, message } = await submitCompany(companyName.trim());
        if (success) {
          console.log('Company submitted successfully');
          onCompanyNameSubmit(companyName.trim());
          setCompanyName('');
        } else {
          if (message === 'Company already exists.') {
            navigate('/review-already-given');
          } else {
            setError(message || 'Failed to submit company. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error submitting company:', error);
        setError('An error occurred while submitting the company.');
      }
    }
  };

  // Cleanup useEffect for debouncedOnChange
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div id="root">
      <WelcomeHeader />
      <div className="company-input-container">
        <h1>Benvenuti su JobInsights.com</h1>
        <p>Per iniziare, inserite il nome della vostra azienda e cliccate su Invia.</p>
        <form onSubmit={handleSubmit} className="company-input-form">
          <input
            className="company-input"
            type="text"
            placeholder="Inserisci il nome della tua azienda"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
          <button className="submit-button" type="submit" disabled={!companyName.trim()}>
            Invia
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CompanyInput;