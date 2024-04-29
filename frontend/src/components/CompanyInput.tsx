import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import WelcomeHeader from './WelcomeHeader';
import '../styles/App.css';

interface CompanyInputProps {
  onCompanyNameSubmit: (companyName: string) => Promise<void>;
  onCompanyNameChange: (companyName: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ onCompanyNameSubmit, onCompanyNameChange }) => {
  const [companyName, setCompanyName] = useState('');

  // Debounced function for temporary content
  const debouncedOnChange = useCallback(debounce((name: string) => {
    onCompanyNameChange(name);
  }, 500), [onCompanyNameChange]);

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCompanyName(name);
    debouncedOnChange(name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (companyName.trim() !== '') {
      onCompanyNameSubmit(companyName.trim()).then(() => setCompanyName(''));
    }
  };

  // Cleanup useEffect for debouncedOnChange
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div className="company-input-container">
      <WelcomeHeader />
      <form onSubmit={handleSubmit} className="company-input-form">
        <input
          className="company-input"
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CompanyInput;
