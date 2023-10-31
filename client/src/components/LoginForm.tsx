import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { config } from "../config";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const { setLoggedIn } = useContext(AuthContext) as AuthContextType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${config.API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem("token", data.token);

        setLoggedIn(true);
        setRedirect(true);

        // window.location.reload();
      } else {
        alert("Login unsuccessful");
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/tasks"} />;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
