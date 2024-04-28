import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import '../styles/App.css';

interface CompanyInputProps {
  onCompanyNameSubmit: (companyName: string) => Promise<void>;
  onCompanyNameChange: (companyName: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ onCompanyNameSubmit, onCompanyNameChange }) => {
  const [companyName, setCompanyName] = useState('');

  // Debounced function for submitting the company name
  const debouncedSubmit = debounce((name: string) => {
    if (name.trim() !== '') {
      onCompanyNameSubmit(name.trim()).then(() => setCompanyName(''));
    }
  }, 500);

  // Debounced function for temporary content
  const debouncedOnChange = useCallback(debounce((name: string) => {
    onCompanyNameChange(name);
  }, 500), [onCompanyNameChange]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
      debouncedSubmit.cancel();
    };
  }, [debouncedOnChange, debouncedSubmit]);

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCompanyName(name);
    debouncedOnChange(name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedSubmit(companyName);
  };

  return (
    <div className="company-input-container">
      <header className="company-header">
        <h1>JobInsights.com</h1>
        <p>Welcome to JobInsights.com</p>
        <p>To begin, please enter your company name and click on submit.</p>
      </header>
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
