import React from 'react';
import './App.css';
import SineGraph from '../../ui/engineer/SineGraph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{
            border: '2px solid black',  // Border thickness, style, and color
            padding: '10px',            // Optional: Add padding inside the border
            margin: '10px'              // Optional: Add margin outside the border
            }}>
            <h1>Match the waves!</h1>
            <SineGraph />
            
            <div style={{ border: 'none' }}>
                
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
