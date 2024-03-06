import React, { useContext, useState } from "react";
import "./Signup.css";
import { Logo } from "../../assets";
import { Spinner } from "../";
import { FirebaseContext } from "../../store/Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const gotToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username !== username.trim()) {
      return toast.error(
        "Username cannot be empty or contain only whitespaces."
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format.");
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error(
        "Phone should contain exactly 10 digits and only numbers."
      );
    }

    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters long.");
    }

    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              email: email,
              phone: phone,
            })
            .then(() => {
              setLoading(false);
              navigate("/login");
            });
        });
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
        <div className="signupParentDiv">
          <img alt="ols-logo" width="200px" height="200px" src={Logo}></img>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="fname"
              name="name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="fname"
              name="email"
              defaultValue="John@gmail.com"
            />
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="lname"
              name="phone"
              defaultValue=""
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
              defaultValue=""
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <a onClick={gotToLogin}>Login</a>
        </div>
      )}
    </div>
  );
};

export default Signup;
