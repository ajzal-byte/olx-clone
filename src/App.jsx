import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { CreatePage, LoginPage, SignupPage } from "./Pages";
import { Toaster } from "react-hot-toast";
import { AuthContext, FirebaseContext } from "./store/Context";

const App = () => {
  const {setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => { 
    firebase.auth().onAuthStateChanged((user) => setUser(user))
  }, [])
  return (
    <div>
      <div><Toaster/></div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
