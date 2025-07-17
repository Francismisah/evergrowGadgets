const { z } = require('zod');

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['user', 'seller']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

const orderSchema = z.array(
  z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })
);

module.exports = {
  validateSignup: (data) => signupSchema.parse(data),
  validateLogin: (data) => loginSchema.parse(data),
  validateOtp: (data) => otpSchema.parse(data),
  validateProduct: (data) => productSchema.parse(data),
  validateOrder: (data) => orderSchema.parse(data),
};