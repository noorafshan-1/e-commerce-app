const API_URL = "http://localhost:5000/api";
// const API_URL = "https://e-commerce-app-8-u7pg.onrender.com/api";

// Prodcuts APIs
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
    credentials: "include", // 👈 MUST for cookie auth
  });
  return res.json();
};

//  Login API
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // 👈 RECEIVE HttpOnly cookie
  });

  const data = await res.json();

  // if (!res.ok) {
  //   throw new Error(data.message || "Invalid credentials");
  // }
  // return data;
  if (!res.ok) throw new Error(data.message || "Invalid credentials");

  return data; // optional (message)
};

// Signup API
export const signupUser = async (firstName, lastName, email, password) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
    credentials: "include", // only if backend sets cookie on signup
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
};
