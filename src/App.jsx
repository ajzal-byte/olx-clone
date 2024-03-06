import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { LoginPage, SignupPage } from "./Pages";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <div><Toaster/></div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
