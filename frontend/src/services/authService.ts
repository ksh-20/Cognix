const BASE = "http://localhost:5001/api/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
};