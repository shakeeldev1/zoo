import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to Send Email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully");
    console.log(info.response);
    return info;
  } catch (error) {
    console.log("Error Sending Email");
    console.log(error);
    throw error;
  }
};

export { sendEmail };
