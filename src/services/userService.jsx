import axios from "axios";

const API_URL = "http://localhost:8080/users";

// Login
export const login = async (user) => {
  try {
    const response = await axios.get(API_URL);
    const account = response.data.find(
      (item) => item.email === user.email && item.password === user.password,
    );
    return account || null;
  } catch (error) {
    console.log("Login error:", error);
    return null;
  }
};
