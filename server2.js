const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/book-session', async (req, res) => {
  const { name, email, time, message, mentor } = req.body;

  const zoomLink = "https://zoom.us/j/your-static-meeting-id";

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'careerguidance460@gmail.com',
      pass: 'zqsfymonnosyagdi'
    }
  });

  const mailOptions = {
    from: '"Career Guidance Platform" <careerguidance460@gmail.com>',
    to: email,
    subject: `Session Confirmation with ${mentor}`,
    html: `
      <h3>Hi ${name},</h3>
      <p>Thank you for booking a session with <strong>${mentor}</strong>.</p>
      <p><strong>Preferred Time:</strong> ${time}</p>
      <p><strong>Your Message:</strong> ${message}</p>
      <p>Please join the session using the following Zoom link:</p>
      <a href="${zoomLink}">${zoomLink}</a>
      <br><br>
      <p>Best regards,<br>Career Guidance Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Failed to send email");
  }
});

// ✅ Updated Port to 4000
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
