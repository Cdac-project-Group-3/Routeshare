import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Header.css";

 

function Header() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

 

  const today = new Date().toLocaleDateString("en-IN", {

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric",

  });

 

  const handleLogout = () => {

    logout();

    navigate("/login", { replace: true });

  };

 

  return (

    <header className="app-header">

      <div className="app-header-left">

        <span className="app-header-logo">🤝</span>

        <div>

          <h1 className="app-header-title">Office Ride Sharing</h1>

          <p className="app-header-subtitle">Share rides. Save money. Save time.</p>

        </div>

      </div>

      <div className="app-header-right">

        <span className="app-header-date">{today}</span>

        {user && (

          <div className="app-header-user">

            <span className="app-header-user-email" title={user.email}>

              {user.email}

            </span>

            <button

              type="button"

              className="app-header-logout"

              onClick={handleLogout}

            >

              Logout

            </button>

          </div>

        )}

      </div>

    </header>

  );

}

 

export default Header;

 

