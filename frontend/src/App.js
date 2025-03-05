import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [inputs, setInputs] = useState([]);

  // Fetch all the user inputs when the app loads
  useEffect(() => {
    const fetchInputs = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}`);
      const data = await res.json();
      setInputs(data.inputs);
    };
    
    fetchInputs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: input }),
    });
    const data = await res.json();
    setResponse(data.message);

    // Update the inputs list to show the new data
    setInputs((prevInputs) => [...prevInputs, { input }]);
  };

  return (
    <div className="app-container">
      <h1>Enter Your Text</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <label className="input-label">
          User Input:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field"
            placeholder="Enter text here"
            required
          />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {response && <p className="response-text">Response from backend: {response}</p>}

      <h2>All Entries</h2>
      <ul className="inputs-list">
        {inputs.map((entry, index) => (
          <li key={index} className="input-item">{entry.input}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

