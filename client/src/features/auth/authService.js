import axios from "axios";

const API_URL = "/api/auth/";
const UPDATE_API_URL = "/api/user/";


// Register user
const signUp = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const signIn = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// get user email for password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgot-password", userData);

  return response.data;
};

// get user email for password
const resetPassword = async (userData) => {
  const response = await axios.put(API_URL + "reset-password", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// verify token from forgot password
const verifyToken = async (token) => {
  const response = await axios.get(`${API_URL}verifyToken?token=${token}`);

  return response.data;
};


// Update user
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(UPDATE_API_URL, userData, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};



// Logout user
const SignOut = () => {
  localStorage.removeItem("user");
};

const authService = {
  signUp,
  SignOut,
  signIn,
  forgotPassword,
  resetPassword,
  verifyToken,
  updateUser

};

export default authService;
