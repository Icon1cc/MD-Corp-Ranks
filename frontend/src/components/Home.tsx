import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import CompanyInput from '../components/CompanyInput';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';
import '../styles/Loader.css';

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showCompanyInput, setShowCompanyInput] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserStatus = async () => {
            setLoading(true);
            try {
                const data = await userService.checkUserStatus();
                setShowCompanyInput(!data.reviewAlreadyGiven);
                if (data.reviewAlreadyGiven) {
                    navigate('/leave-email');
                }
            } catch (error) {
                setError('There was an error fetching user status.');
                console.error('Error during user status check:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStatus();
    }, [navigate]);

    const handleCompanySubmit = async (companyName: string) => {
        console.log('Company name submitted:', companyName);
        navigate('/review');
    };

    return (
        <div className={`content ${loading ? 'blurred' : ''}`}>
            {error && <div className="error-message">{error}</div>}
            {loading && <Loader />}
            {!loading && showCompanyInput &&
                <CompanyInput onCompanyNameSubmit={handleCompanySubmit} />} {/* Corrected prop name */}
            {!loading && !showCompanyInput &&
                <div>Please leave your email or navigate to the appropriate route.</div>}
        </div>
    );
};

export default Home;