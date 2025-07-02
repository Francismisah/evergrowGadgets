const nodemailer = require('nodemailer');

class ContactService {
  async sendContactMessage({ name, email, message }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: `"Evergrow Gadgets" <${process.env.EMAIL_USER}>`,
      subject: `Contact Us Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, message: 'Failed to send message' };
    }
  }
}

module.exports = new ContactService();