import { useState } from "react";
import "./login-form.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setSuccessMessage("");

    const storedData = localStorage.getItem("userData");

    if (!storedData) {
      setEmailError("User not found. Please register first.");
      setTimeout(() => {
        navigate("/auth/register");
      }, 3000);
      return;
    }

    const userData = JSON.parse(storedData);

    let hasError = false;

    if (email !== userData.email) {
      setEmailError("Email does not match our records.");
      hasError = true;
    }
    if (password !== userData.password) {
      setPasswordError("Incorrect password.");
      hasError = true;
    }

    if (hasError) return;

    const loginData = {
      isLoggedIn: true,
      name: userData.name,
      email: userData.email,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("currentUser", JSON.stringify(loginData));

    setSuccessMessage("Successfully logged in! Redirecting to homepage...");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="form-container" noValidate>
        <input
          type="email"
          className={`form-control ${emailError ? "input-error" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {emailError && <div className="input-error-message">{emailError}</div>}

        <input
          type="password"
          className={`form-control ${passwordError ? "input-error" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
        {passwordError && (
          <div className="input-error-message">{passwordError}</div>
        )}

        {successMessage && (
          <div className="form-success-message">{successMessage}</div>
        )}

        <button type="submit" className="btn btn-white">
          Submit
        </button>
        <p className="register-link">
          Don't have an account?{" "}
          <a href="/auth/register" className="link">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
