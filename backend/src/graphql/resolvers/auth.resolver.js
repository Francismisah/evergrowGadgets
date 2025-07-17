const authService = require('../../services/auth.service');
const { validateSignup, validateLogin, validateOtp } = require('../../utils/validator');

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await authService.getUserById(user.id);
    },
  },
  Mutation: {
    signup: async (_, { firstName, lastName, email, password, name, role }) => {
      validateSignup({ firstName, lastName, email, password, name, role });
      return await authService.signup({ firstName, lastName, email, password, name, role });
    },
    login: async (_, { email, password }) => {
      validateLogin({ email, password });
      return await authService.login({ email, password });
    },
    verifyEmail: async (_, { email, otp }) => {
      validateOtp({ email, otp });
      return await authService.verifyEmail({ email, otp });
    },
    sendOtp: async (_, { email }) => {
      return await authService.sendOtp(email);
    },
    googleAuth: async (_, { code }) => {
      return await authService.googleAuth(code);
    },
  },
};