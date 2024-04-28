import React, { useState } from 'react';
import { debounce } from 'lodash';
import '../styles/App.css';

interface CompanyInputProps {
  onCompanyNameSubmit: (companyName: string) => Promise<void>;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ onCompanyNameSubmit }) => {
  const [companyName, setCompanyName] = useState('');

  const debouncedSubmit = debounce((name: string) => {
    onCompanyNameSubmit(name).then(() => setCompanyName(''));
  }, 500);

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
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