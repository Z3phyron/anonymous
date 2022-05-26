const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const SendMail = asyncHandler(async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.send.USER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("mail sent successfully");
  } catch (error) {
    console.log("Email not sent");
    throw new Error(error);
  }
});

module.exports = {
  SendMail,
};
