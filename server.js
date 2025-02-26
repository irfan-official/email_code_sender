import express from "express";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import cors from "cors";
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to code sender via email\n developed by: Kazi Irfan,\n POST request /send-mail with (target_email,verification_code)");
});

app.post("/send-mail", async (req, res) => {
  const { email, code } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Hostinger SMTP host
    port: process.env.EMAIL_PORT, // 465 for SSL, 587 for TLS
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER, // Your Hostinger email
      pass: process.env.EMAIL_PASS, // Email password
    },
  });

  const mailOptions = {
    from: `"Irfan" <${process.env.EMAIL_USER}>`,
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
