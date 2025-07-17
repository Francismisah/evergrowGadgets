const transporter = require('../config/email');
const otpUtil = require('../utils/otp');
const OTP = require('../models/OTP');

class EmailService {
  async sendOtp(email) {
    const otp = otpUtil.generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await OTP.create({ email, otp, expiresAt });

    const mailOptions = {
      from: `"Evergrow Gadgets" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email - Evergrow Gadgets',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; }
            .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
            .content { padding: 20px; }
            .otp { font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center; }
            .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Evergrow Gadgets</h1>
            </div>
            <div class="content">
              <h2>Email Verification</h2>
              <p>Thank you for signing up with Evergrow Gadgets! Please use the OTP below to verify your email address:</p>
              <p class="otp">${otp}</p>
              <p>This OTP is valid for 10 minutes. If it expires, you can request a new one.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Evergrow Gadgets. All rights reserved.</p>
              <p>Contact us: support@evergrowgadgets.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  }
}

module.exports = new EmailService();