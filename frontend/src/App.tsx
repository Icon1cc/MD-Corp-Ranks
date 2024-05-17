import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReviewWizard from './pages/ReviewWizard';
import ReviewAlreadyGiven from './components/ReviewAlreadyGiven';
import ThankYou from './pages/ThankYou';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewWizard />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/review-already-given" element={<ReviewAlreadyGiven />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;