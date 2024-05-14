import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import CompanyInput from '../components/CompanyInput';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';
import '../styles/Loader.css';
import submitCompany from '../services/submitCompany';

const Home: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCompanyInput, setShowCompanyInput] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserStatus() {
            setLoading(true);
            try {
                const data = await userService.checkUserStatus();
                if (data.reviewAlreadyGiven) {
                    navigate('/review-already-given');
                } else {
                    setShowCompanyInput(true);
                }
            } catch (error) {
                setError('There was an error fetching user status.');
                console.error('Error during user status check:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserStatus();
    }, [navigate]);

    const handleCompanyNameChange = (companyName: string) => {
        console.log('Current company name:', companyName);
    };

    const handleCompanySubmit = async (companyName: string) => {
        setLoading(true);
        try {
            const statusCheck = await userService.checkUserStatus();
            if (statusCheck.reviewAlreadyGiven) {
                navigate('/review-already-given');
            } else {
                const submissionResult = await submitCompany(companyName);
                if (submissionResult.success) {
                    console.log('Company name submitted:', companyName);
                    navigate('/review');
                } else {
                    setError(submissionResult.message ?? 'An error occurred during submission.');
                    console.error('Failed to submit company:', submissionResult.message);
                }
            }
        } catch (error) {
            setError('There was an error during the submission process.');
            console.error('Error during the submission process:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`content ${loading ? 'blurred' : ''}`}>
            {error && <div className="error-message">{error}</div>}
            {loading && <Loader />}
            {!loading && showCompanyInput &&
                <CompanyInput
                    onCompanyNameSubmit={handleCompanySubmit}
                    onCompanyNameChange={handleCompanyNameChange}
                />}
            {!loading && !showCompanyInput &&
                <div>Please leave your email or navigate to the appropriate route.</div>}
        </div>
    );
};

export default Home;
