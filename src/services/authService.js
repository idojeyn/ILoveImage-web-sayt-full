// src/services/authService.js

const API_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.user.token);
    return data.user;
  } else {
    throw new Error(data.errors?.body?.join(", ") || "Invalid credentials");
  }
};

export const signup = async (username, email, password) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { username, email, password } }),
  });
  const data = await res.json();
  if (res.ok) {
    return data.user;
  } else {
    throw new Error(data.errors?.body?.join(", ") || "Error in registration");
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Authorization": `Token ${token}`, // JWT header
    },
  });
  const data = await res.json();
  if (res.ok) {
    return data.user;
  } else {
    throw new Error("Unauthorized");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
