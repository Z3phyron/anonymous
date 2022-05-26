import axios from "axios";


const EMAIL_API_URL = "/api/email/";

const verifyEmail = async (token) => {
  const response = await axios.post(
    `${EMAIL_API_URL}verifyEmail?token=${token}`
  );

  return response.data;
};

const emailService = {

  verifyEmail,
};

export default emailService;