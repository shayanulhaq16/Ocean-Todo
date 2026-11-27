import { Link, useNavigate } from "react-router";
import { supabase } from "../credentials";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { PropagateLoader } from "react-spinners";
import "../styles.css";
import { useState, useEffect } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {

    const [loader, setLoader] = useState(false)

  // ye HTML ko chalanay ke liye ha alert me
  useEffect(() => {
    Report.init({
      plainText: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const login_user = async () => {

setLoader(true);

    try {

      if (!email.trim()) {
        Report.warning(
          'Empty Email',
          "There is no email!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;
      }
      else if (!EMAIL_REGEX.test(email.trim())) {
        Report.warning(
          'Email Error',
          "There is no Perfect email!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;

      } else if (password.trim().length < 8) {
        Report.warning(
          'Password Error',
          "Write Your Perfect Email Password!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;

      } else {

        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if (error) {
          Report.failure(
            error.message,
            'There is no such User-Account ! <br/><br/>- Ocean Todo',
            'Okay',
          );

        } else {
          Report.success(
            "Login Success",
            'You are in! <br/><br/>- Ocean Todo',
          );
          navigate("./todo")
        }

      }

    } catch (error) {
      Report.warning(
        'Ocean Todo',
        error?.message || error,
        'Okay',
      );
    }finally{
      setLoader(false)
    }


  }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <span className="brand-icon">🌊</span>
          <h1>Ocean Todo</h1>
        </div>

        <h2>Welcome back</h2>
        <p className="subtitle">Log in to manage your tasks</p>

        <form className="auth-form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={login_user}>
            {loader
                          ?
                          <PropagateLoader color="#6B4A2F" />
                          :
                          "Login"
                        }
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}