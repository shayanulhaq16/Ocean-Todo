import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { PropagateLoader } from "react-spinners";
import "../styles.css";
import { supabase } from "../credentials";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Signup() {

  const [loader, setLoader] = useState(false)

  // ye HTML ko chalanay ke liye ha alert me
  useEffect(() => {
    Report.init({
      plainText: false,
    });
  }, []);


  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conformPassword, setConformPassword] = useState("")

  const navigate = useNavigate()

  const signup_user = async () => {

    setLoader(true);

    try {

      if (userName.trim().length < 3) {

        Report.warning(
          'Name Error',
          "Enter your full Name (at least 3 characters)!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;
      }

      else if (!email.trim()) {
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
          "There is not a Perfect email!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;

      } else if (password.trim().length <= 7) {
        Report.warning(
          'Password Error',
          "Enter your email password (at least 8 characters)!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;

      } else if (password !== conformPassword) {
        Report.warning(
          'Conform Password Error',
          "Confirm your password (Enter password again)!<br/><br/>- Ocean Todo",
          'Okay',
        );
        return;

      } else {
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
      }

    } catch (error) {
      Report.failure(
        "Error",
        error?.message || error,
        'Okay',
      );
    } finally {
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
              placeholder="At least 8 characters"
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
            {loader
              ?
              <PropagateLoader color="#6B4A2F" />
              :
              "Sign up"}
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}





// spinner laganay ha sab me