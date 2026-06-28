import { useState } from "react";

import { useNavigate, Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

 

function Signup() {

  const navigate = useNavigate();

  const { signup, isAuthenticated } = useAuth();

 

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

    confirmPassword: "",

    contact: "",

  });

  const [errors, setErrors] = useState({});

 

  if (isAuthenticated) {

    return <Navigate to="/avail" replace />;

  }

 

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));

  };

 

  const validate = () => {

    const next = {};

    if (!form.name.trim()) next.name = "Required";

    if (!form.email.trim()) next.email = "Required";

    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))

      next.email = "Enter a valid email";

    if (!form.password) next.password = "Required";

    else if (form.password.length < 6)

      next.password = "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)

      next.confirmPassword = "Passwords do not match";

    if (form.contact && !/^\d{10}$/.test(form.contact.trim()))

      next.contact = "Enter a valid 10-digit number";

    setErrors(next);

    return Object.keys(next).length === 0;

  };

 

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    const result = signup({

      name: form.name.trim(),

      email: form.email.trim().toLowerCase(),

      password: form.password,

      contact: form.contact.trim(),

      extension: "",

      defaultStartPoint: "",

    });

    if (result.ok) {

      navigate("/avail", { replace: true });

    } else {

      setErrors({ form: result.error });

    }

  };

 

  return (

    <div className="login-screen">

      <div className="login-card">

        <div className="login-header">

          <span className="login-logo">🤝</span>

          <h1>Create your account</h1>

          <p>Join the Office Ride Sharing platform.</p>

        </div>

 

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          <label className="login-field">

            <span>Full name *</span>

            <input

              type="text"

              name="name"

              value={form.name}

              onChange={handleChange}

              autoFocus

            />

            {errors.name && (

              <small className="login-field-error">{errors.name}</small>

            )}

          </label>

 

          <label className="login-field">

            <span>Email *</span>

            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              placeholder="you@company.com"

              autoComplete="username"

            />

            {errors.email && (

              <small className="login-field-error">{errors.email}</small>

            )}

          </label>

 

          <label className="login-field">

            <span>Contact</span>

            <input

              type="tel"

              name="contact"

              value={form.contact}

              onChange={handleChange}

              placeholder="10-digit mobile number"

            />

            {errors.contact && (

              <small className="login-field-error">{errors.contact}</small>

            )}

          </label>

 

          <label className="login-field">

            <span>Password *</span>

            <input

              type="password"

              name="password"

              value={form.password}

              onChange={handleChange}

              placeholder="At least 6 characters"

              autoComplete="new-password"

            />

            {errors.password && (

              <small className="login-field-error">{errors.password}</small>

            )}

          </label>

 

          <label className="login-field">

            <span>Confirm password *</span>

            <input

              type="password"

              name="confirmPassword"

              value={form.confirmPassword}

              onChange={handleChange}

              autoComplete="new-password"

            />

            {errors.confirmPassword && (

              <small className="login-field-error">

                {errors.confirmPassword}

              </small>

            )}

          </label>

 

          {errors.form && <div className="login-error">{errors.form}</div>}

 

          <button type="submit" className="btn btn-primary login-submit">

            Create account

          </button>

        </form>

 

        <div className="login-hint">

          Already have an account? <Link to="/login">Sign in</Link>

        </div>

      </div>

    </div>

  );

}

 

export default Signup;

 

