import React, { useState } from 'react';
import Form from './Form';
import ScannerList from './ScannerList';
import './App.css';
import wave from "./wavescan.png";

function App() {
  const [scanners, setScanners] = useState([]);
  const [error, setError] = useState(null);

  const addScanner = scanner => {
    setScanners([...scanners, scanner]);
  }

  const handleFormSubmit = async formData => {
    try {
      const response = await fetch('https://wavescan-internship.saurabhmudgal.repl.co/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        addScanner(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  }

  return (
    <main className=" bg-gradient-to-tr from-slate-700 via-black to-slate-700 min-h-screen flex flex-col">
    <img src={wave} className="object-contain h-20 w-20 sm:h-32 sm:w-32 md:h-32 md:w-32 lg:h-32 lg:w-32 mt-0 ml-32" alt="Wave" />
    
    <div className="App">
      {error && <p className="error">{error}</p>}
      <Form onSubmit={handleFormSubmit} />
      {scanners.length > 0 && <ScannerList scanners={scanners} />}
    </div>
    </main>
  );
}

export default App;