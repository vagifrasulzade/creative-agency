import { useState } from "react";
import "./register-form.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    notification: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Please enter your name";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name format is incorrect";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.age) {
      newErrors.age = "Please enter your age";
    } else if (isNaN(Number(formData.age))) {
      newErrors.age = "Age must be a number";
    }

    if (!formData.password) {
      newErrors.password = "Please enter a password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationsError = validateForm();
    if (Object.keys(validationsError).length === 0) {
      console.log("User info: ", formData);

      const userData = {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        password: formData.password,
        notification: formData.notification,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      setErrors({});
      setSuccessMessage(
        "Registration completed successfully! Redirecting to login page..."
      );

      setFormData({
        name: "",
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
        notification: false,
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } else {
      setErrors(validationsError);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit} className="form-container" noValidate>
        {successMessage && (
          <div className="form-success-message">{successMessage}</div>
        )}

        <input
          name="name"
          type="text"
          className={`form-control ${errors.name ? "input-error" : ""}`}
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          name="email"
          type="email"
          className={`form-control ${errors.email ? "input-error" : ""}`}
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          name="age"
          type="number"
          className={`form-control ${errors.age ? "input-error" : ""}`}
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Age"
          min="0"
        />
        {errors.age && <span className="error">{errors.age}</span>}

        <input
          name="password"
          type="password"
          className={`form-control ${errors.password ? "input-error" : ""}`}
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          name="confirmPassword"
          type="password"
          className={`form-control ${
            errors.confirmPassword ? "input-error" : ""
          }`}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <label className="check-control">
          <input
            type="checkbox"
            name="notification"
            checked={formData.notification}
            onChange={handleCheckboxChange}
          />
          Subscribe to newsletter
        </label>

        <button type="submit" className="btn btn-white">
          Submit
        </button>
        <p className="login-link">
          Already have an account?{" "}
          <a href="/auth/login" className="link">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
