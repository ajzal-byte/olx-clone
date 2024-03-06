import React, { useContext, useState } from "react";
import "./Login.css";
import { Logo } from "../../assets";
import { FirebaseContext } from "../../store/Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/signup')
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format.");
    }

    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters long.");
    }

    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="loginParentDiv">
          <img width="200px" height="200px" src={Logo}></img>
          <form onSubmit={handleLogin}>
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="fname"
              name="email"
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="lname"
              name="password"
            />
            <br />
            <br />
            <button>Login</button>
          </form>
          <a onClick={goToSignup}>Signup</a>
        </div>
      )}
    </div>
  );
};

export default Login;
