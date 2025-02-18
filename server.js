import express from "express";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  const { email, code } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP config
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default app;
