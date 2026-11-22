import { Link } from "react-router";
import "../styles.css";

export default function Login() {
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
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}