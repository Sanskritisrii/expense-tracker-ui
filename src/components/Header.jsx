import { useNavigate } from "react-router-dom";
import Icon from "./Icon.jsx";
import { currentUser, logout } from "../data/store.js";

export default function Header() {
  const navigate = useNavigate();
  const user = currentUser();
  const initials = user ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="hdr">
      <div className="logo">
        <div className="logo-box"><Icon name="coin" size={26} /></div>
        Expense Tracker
      </div>
      <div className="who">
        <div className="avatar">{initials}</div>
        <div className="who-text">
          <small>Welcome back,</small>
          <b>{user ? user.name : ""}</b>
        </div>
        <button className="link-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
