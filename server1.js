const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
app.use(cors());

// File upload middleware
const upload = multer({ dest: 'uploads/' });

app.post('/submitApplication', upload.single('resume'), async (req, res) => {
  const email = req.body.email;
  const internship = req.body.internship;
  const resumeFile = req.file;

  if (!email || !resumeFile || !internship) {
    return res.status(400).send('Missing fields');
  }

  // Create email transporter (use real credentials in production)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'careerguidance460@gmail.com',         
      pass:'zqsfymonnosyagdi' 
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: `Application Received for ${internship}`,
    text: `Hello,\n\nThank you for applying for the internship: ${internship}.\nWe have received your resume and will get back to you shortly.\n\nBest regards,\nThe Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Application submitted successfully. An acknowledgment email has been sent.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Application received but failed to send acknowledgment email.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

nodemailer.createTestAccount().then(testAccount => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  // Send mail as usual
});
