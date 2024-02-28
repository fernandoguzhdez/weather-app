// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa Routes
import Home from './components/Home';
import Weather from './components/Weather';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Usa Routes en lugar de Route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
