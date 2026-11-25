import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { login } from "../data/store.js";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const user = login(username.trim(), password);
    if (!user) {
      setError("Wrong username or password.");
      return;
    }
    navigate("/expenses");
  }

  return (
    <div className="login-page">
      <aside className="login-art">
        <h1>Track every<br />rupee.</h1>
        <p>See where your money goes, one expense at a time.</p>
        <svg viewBox="0 0 600 420" className="art-svg" aria-hidden="true">
          <rect x="120" y="20" width="360" height="200" rx="20" fill="#fff" opacity=".96" />
          <text x="148" y="62" fontFamily="Open Sans, Arial" fontSize="16" fontWeight="700" fill="#0f766e">This month</text>
          <rect x="150" y="160" width="40" height="40" rx="6" fill="#99f6e4" />
          <rect x="210" y="130" width="40" height="70" rx="6" fill="#5eead4" />
          <rect x="270" y="95" width="40" height="105" rx="6" fill="#14b8a6" />
          <rect x="330" y="140" width="40" height="60" rx="6" fill="#f59e0b" />
          <rect x="390" y="80" width="40" height="120" rx="6" fill="#1d4ed8" />
          <rect x="150" y="250" width="300" height="110" rx="20" fill="#0b3d3a" />
          <rect x="150" y="270" width="300" height="90" rx="20" fill="#115e59" />
          <rect x="380" y="295" width="70" height="36" rx="18" fill="#f59e0b" />
          <circle cx="400" cy="313" r="6" fill="#fff" />
          <circle cx="500" cy="290" r="38" fill="#fbbf24" stroke="#f59e0b" strokeWidth="6" />
          <text x="500" y="302" textAnchor="middle" fontFamily="Open Sans, Arial" fontSize="34" fontWeight="700" fill="#b45309">₹</text>
        </svg>
      </aside>

      <main className="login-form-side">
        <form className="login-box" onSubmit={handleSubmit} noValidate>
          <div className="login-brand">
            <div className="logo-box teal"><Icon name="coin" size={26} /></div>
            Expense Tracker
          </div>
          <h1>Login</h1>
          <p className="muted">Enter your username and password to continue.</p>

          <label className="field">
            <span className="lab">Username</span>
            <div className="input with-icon">
              <Icon name="user" color="#6b7280" size={20} />
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
            </div>
          </label>
          <label className="field">
            <span className="lab">Password</span>
            <div className="input with-icon">
              <Icon name="lock" color="#6b7280" size={20} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
          </label>

          <div className="error">{error}</div>
          <button type="submit" className="btn gradient full">Login</button>
          <p className="hint">Test login: demo_user / demo123</p>
        </form>
      </main>
    </div>
  );
}
