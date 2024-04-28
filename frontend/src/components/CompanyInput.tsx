import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface CompanyInputProps {
  onCompanyNameSubmit: (companyName: string) => Promise<void>;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ onCompanyNameSubmit }) => {
  const [companyName, setCompanyName] = useState('');

  const debouncedSubmit = debounce(onCompanyNameSubmit, 500);

  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
    debouncedSubmit(event.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSubmit.cancel();
    };
  }, [debouncedSubmit]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedSubmit.flush();
  };

  return (
    <div className="company-input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CompanyInput;