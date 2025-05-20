require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

const otps = {}; // Temporary memory store

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/send-otp', (req, res) => {
  const email = req.body.email;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otps[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000 // 5 minutes
  };

  const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Your OTP Code from AlfaPortfolio',
  // Use html field instead of text for rich email content
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #2c3e50;">AlfaPortfolio</h2>
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="letter-spacing: 6px; color: #27ae60;">${otp}</h1>
      <p>This code is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      <hr style="margin: 20px 0;">
      <p style="font-style: italic; color: #7f8c8d;">
        "Well done is better than well said." – Benjamin Franklin
      </p>
      <p>Thank you for trusting AlfaPortfolio.</p>
      <p style="font-size: 12px; color: #95a5a6;">If you did not request this, please ignore this email.</p>
    </div>
  `
};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      return res.send('Error sending OTP. Please try again.');
    }
    res.sendFile(path.join(__dirname, '/views/verify.html'));
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const stored = otps[email];

  if (stored && stored.otp === otp && Date.now() < stored.expires) {
    delete otps[email]; // Clear used OTP
    res.sendFile(path.join(__dirname, '/views/success.html'));
  } else {
    res.send('Invalid Mail or expired OTP. Try again.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
