import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Report } from 'notiflix/build/notiflix-report-aio';
import "../styles.css";
import { supabase } from "../credentials";

export default function Signup() {

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conformPassword, setConformPassword] = useState("")

  const navigate = useNavigate()

  const signup_user = async () => {


    try {

      if (userName.trim().length > 3 && email.trim() !== "" && password.trim().length > 7 && password === conformPassword) {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: userName,
            },
          },
        })

        if (error) {
          Report.failure(
            "Something went Wrong!",
            error.message,
            'Okay',
          );
        } else {
          Report.success(
            "Login Success",
            '<p>You are in! <br/><br/>- Ocean Todo<p/>',
          );
          navigate("../todo")
        }
      } else {
        Report.failure(
            "Error",
            "Something is not defined! <br/><br/>- Ocean Todo",
            'Okay',
          );
        }
        
      } catch (error) {
      Report.failure(
          "Error",
          error?.message || error,
          'Okay',
        );
    }

  }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <span className="brand-icon">🌊</span>
          <h1>Ocean Todo</h1>
        </div>

        <h2>Create an account</h2>
        <p className="subtitle">Start organizing your tasks today</p>

        <form className="auth-form">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={signup_user}>
            Sign up
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}



// signup or todo me notofilix ko laagana ha
// download pdf ka opition lagana ha
// spinner laganay ha sab me