import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { CreatePage, LoginPage, SignupPage, ViewPost } from "./Pages";
import { Toaster } from "react-hot-toast";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";

const App = () => {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setUser(user));
  }, []);
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Post>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/create" element={<CreatePage />}></Route>
            <Route path="/view" element={<ViewPost />}></Route>
          </Routes>
        </Router>
      </Post>
    </div>
  );
};

export default App;
