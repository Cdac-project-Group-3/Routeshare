import React, { useState } from "react";

import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

 

function Login() {

  const navigate = useNavigate();

  const location = useLocation();

  const { login, isAuthenticated } = useAuth();

 

  const [form, setForm] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

 

  if (isAuthenticated) {

    return <Navigate to="/avail" replace />;

  }

 

  const redirectTo = location.state?.from || "/avail";

 

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));

  };

 

  const handleSubmit = (e) => {

    e.preventDefault();

 

    // Read straight from the DOM so browser-autofilled values are picked up

    // even when React's onChange did not fire for them.

    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") || "").toString().trim();

    const password = (formData.get("password") || "").toString();

 

    const nextErrors = {};

    if (!email) nextErrors.email = "Email is required";

    if (!password) nextErrors.password = "Password is required";

    if (Object.keys(nextErrors).length > 0) {

      setErrors(nextErrors);

      return;

    }

 

    const result = login({ email, password });

    if (result.ok) {

      navigate(redirectTo, { replace: true });

    } else {

      setErrors({ form: result.error });

    }

  };

 

  return (

    <div className="login-screen">

      <div className="login-card">

        <div className="login-header">

          <span className="login-logo">🤝</span>

          <h1>Office Ride Sharing</h1>

          <p>Sign in to share or book rides with colleagues.</p>

        </div>

 

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          <label className="login-field">

            <span>Email</span>

            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              placeholder="test@gmail.com"

              autoComplete="username"

              autoFocus

            />

            {errors.email && (

              <small className="login-field-error">{errors.email}</small>

            )}

          </label>

 

          <label className="login-field">

            <span>Password</span>

            <div className="login-password-wrap">

              <input

                type={showPassword ? "text" : "password"}

                name="password"

                value={form.password}

                onChange={handleChange}

                placeholder="Enter password"

                autoComplete="current-password"

              />

              <button

                type="button"

                className="login-toggle"

                onClick={() => setShowPassword((s) => !s)}

              >

                {showPassword ? "Hide" : "Show"}

              </button>

            </div>

            {errors.password && (

              <small className="login-field-error">{errors.password}</small>

            )}

          </label>

 

          {errors.form && <div className="login-error">{errors.form}</div>}

 

          <button type="submit" className="btn btn-primary login-submit">

            Sign in

          </button>

        </form>

 

        <div className="login-hint">

          <strong>Demo credentials:</strong>

          <div>Email: <code>test@gmail.com</code></div>

          <div>Password: <code>123456</code></div>

        </div>

 

        <div className="login-hint">

          Don't have an account? <Link to="/signup">Create one</Link>

        </div>

      </div>

    </div>

  );

}

 

export default Login;

 

