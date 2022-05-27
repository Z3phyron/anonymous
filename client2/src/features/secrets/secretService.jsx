import axios from "axios";

const API_URL = "https://dsecret.herokuapp.com/api/secret/";

// Create new post
const createSecret = async ({values, userName}) => {


 console.log(userName);
  const response = await axios.post(`${API_URL}${userName}`, values);

  return response.data;
};

// Get user goals
const getSecrets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};




const postService = {
  createSecret,
  getSecrets,

};

export default postService;
