import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      if (data.error_message) {
        alert(data.error_message);
      } else {
        alert(data.message);
        navigate("/dashboard");
        localStorage.setItem("_id", data.id);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to perform the operation. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
    setEmail("");
    setPassword("");
  };

  return (
    <main className="login">
      <h1 className="loginTitle">Log into your account</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn">SIGN IN</button>
        <p>
           <Link to="/register">Create account</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
