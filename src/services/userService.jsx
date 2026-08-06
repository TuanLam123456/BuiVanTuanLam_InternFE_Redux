import axios from "axios";

const API_URL = "http://localhost:8080/users";

// Login
export const login = async (user) => {
  const response = await axios.get(`${API_URL}?email=${user.email}`);

  return response.data.filter((item) => item.password === user.password);
};
