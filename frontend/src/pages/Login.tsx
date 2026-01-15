import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = await loginUser(email, password);
    login(data);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 p-6 border rounded space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;