import React, { useEffect, useState } from "react";
import "./welcome.css";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () =>{

    if(registerInfo.email !== registerInfo.confirmEmail){
        alert("Please confirm that both emails are same")
    } else if(registerInfo.password !== registerInfo.confirmPassword){
        alert("Please confirm that both passwords are same")
    }

    createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="container">
      <div className="wel-heading">Welcome</div>
      <br />
      {registering ? (
        <>
          <div className="SignIn-cont">
            <h1>Register</h1>
            <input
              value={registerInfo.email}
              onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})}
              type="email"
              className="input"
              placeholder="Enter your Email"
            />
            <input
              value={registerInfo.confirmEmail}
              onChange={(e) => setRegisterInfo({...registerInfo, confirmEmail: e.target.value})}
              type="email"
              className="input"
              placeholder="Confirm Email"
            />
            <input
              value={registerInfo.password}
              onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})}
              type="password"
              className="input"
              placeholder="Enter your Password"
            />
            <input
              value={registerInfo.confirmPassword}
              onChange={(e) => setRegisterInfo({...registerInfo, confirmPassword: e.target.value})}
              type="email"
              className="input"
              placeholder="Confirm password"
            />
            <button onClick={handleRegister} className="SignIn-btn">
              Register
            </button>
            <button
              onClick={() => {
                setRegistering(false);
              }}
              className="reg-btn"
            >
              Go back
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="SignIn-cont">
            <h1>Sign In</h1>
            <input
              onChange={handleEmailChange}
              value={email}
              type="email"
              className="input"
              placeholder="Enter your Email"
            />
            <input
              onChange={handlePasswordChange}
              value={password}
              type="password"
              className="input"
              placeholder="Enter your Password"
            />
            <button onClick={handleSignIn} className="SignIn-btn">
              Sign In
            </button>
            <button
              onClick={() => {
                setRegistering(true);
              }}
              className="reg-btn"
            >
              Create an account
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomePage;
