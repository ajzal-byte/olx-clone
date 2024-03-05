import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (

    <div>
      {/* <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Link to='/hi'>this is hi</Link>
        </Routes>

      </Router> */}
      <Home />
    </div>
  );
}

export default App;
