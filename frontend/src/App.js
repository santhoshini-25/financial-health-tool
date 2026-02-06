import React, { useState } from 'react';
import './App.css';  // Keep this for basic styling
import Upload from './components/Upload';  // Import your Upload component
import Dashboard from './components/Dashboard';  // Import a new Dashboard component (we'll create it below)
import { useTranslation } from 'react-i18next';  // For multilingual support

function App() {
  const { t, i18n } = useTranslation();  // Hook for translations
  const [insights, setInsights] = useState('');  // State to store AI insights from backend
  const [financialData, setFinancialData] = useState({});  // State for data to visualize

  // Function to handle insights from Upload component
  const handleInsights = (data) => {
    setInsights(data.insights);
    setFinancialData(data.financialData || {});  // Assume backend returns parsed data
  };

  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      {/* Simple header with title and language switcher */}
      <header className="App-header">
        <h1>{t('appTitle')}</h1>  {/* Translated title */}
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hi')}>Hindi</button>
      </header>

      {/* Main content area */}
      <main>
        <Upload onInsights={handleInsights} />  {/* Pass callback to handle backend response */}
        <Dashboard insights={insights} data={financialData} />  {/* Pass data for visualization */}
      </main>
    </div>
  );
}

export default App;