import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';
import SignInPage from './components/SignInPage';
import VulnerabilityScannerPage from './components/VulnerabilityScannerPage';
import CompliancePage from './components/CompliancePage';
import PentestReportPage from './components/PentestReportPage';

// Define a shared type for findings to be used across components
export type Finding = {
  vulnerabilityName: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  description: string;
  risk: string;
  remediation: string;
  affectedFrameworks: string[];
  category: 'Web' | 'Cloud' | 'Email' | 'Data Leak';
};

export type ScanTarget = {
  type: 'Website' | 'Cloud Configuration' | 'Email' | 'Data Privacy';
  value: string;
};

const App: React.FC = () => {
  // Lift state up to the main App component
  const [findings, setFindings] = useState<Finding[]>([]);
  const [scanTarget, setScanTarget] = useState<ScanTarget | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-brand-dark font-sans">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} findings={findings} scanTarget={scanTarget} />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <DashboardPage findings={findings} scanTarget={scanTarget} /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/scanner" 
              element={isLoggedIn ? <VulnerabilityScannerPage setFindings={setFindings} setScanTarget={setScanTarget} /> : <Navigate to="/signin" />} 
            />
             <Route 
              path="/report" 
              element={isLoggedIn ? <PentestReportPage findings={findings} scanTarget={scanTarget} /> : <Navigate to="/signin" />} 
            />

            {/* Public Routes */}
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/signin" element={!isLoggedIn ? <SignInPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;