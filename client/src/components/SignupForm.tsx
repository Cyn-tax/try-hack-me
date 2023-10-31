import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { config } from "../config";

const SignupForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const { isLoggedIn, setLoggedIn } = useContext(
    AuthContext
  ) as AuthContextType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signupData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(`${config.API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful");
        localStorage.setItem("token", data.token);
        alert("User created successfully");

        setLoggedIn(true);
        setRedirect(true);
        console.log(redirect, isLoggedIn);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/tasks"} />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
