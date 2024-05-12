import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReviewAlreadyGiven from './pages/ReviewAlreadyGiven';
import ReviewWizard from './pages/ReviewWizard';
import ThankYou from './pages/ThankYou';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review-already-given" element={<ReviewAlreadyGiven />} />
          <Route path="/review" element={<ReviewWizard />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;