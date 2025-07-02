const User = require('../models/user');
const OTP = require('../models/OTP');
const jwt = require('../utils/jwt');
const emailService = require('./email.service');
const otpUtil = require('../utils/otp');

class AuthService {
  async signup({ firstName, lastName, email, password, name, role }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already exists');

    const validRoles = ['user', 'seller'];
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      name,
      role: validRoles.includes(role) ? role : 'user',
    });
    await emailService.sendOtp(email);
    return { message: 'OTP sent to email' };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    if (!user.isVerified) throw new Error('Email not verified');
    const token = jwt.generateToken({ id: user._id, role: user.role });
    return { token, user };
  }

  async verifyEmail({ email, otp }) {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      throw new Error('Invalid or expired OTP');
    }
    const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
    await OTP.deleteOne({ email, otp });
    const token = jwt.generateToken({ id: user._id, role: user.role });
    return { token, user };
  }

  async sendOtp(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('Email already verified');
    return await emailService.sendOtp(email);
  }

  async getUserById(id) {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  async googleAuth(profile) {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = await User.create({
        firstName: profile.name.givenName || 'Google',
        lastName: profile.name.familyName || 'User',
        email: profile.emails[0].value,
        name: profile.displayName,
        role: 'user',
        isVerified: true,
      });
    }
    const token = jwt.generateToken({ id: user._id, role: user.role });
    return { token, user };
  }
}

module.exports = new AuthService();