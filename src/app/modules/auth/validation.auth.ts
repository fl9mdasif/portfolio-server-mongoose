import { z } from 'zod';

// export const loginValidationSchema = z.object({
//   body: z.object({
//     email: z.string().email(),
//     password: z.string({ required_error: 'Password is required' }),
//   }),
// });

// const changePasswordValidationSchema = z.object({
//   body: z.object({
//     currentPassword: z.string({
//       required_error: 'Old password is required',
//     }),
//     newPassword: z.string({ required_error: 'Password is required' }),
//   }),
// });

 
const userRegistrationValidation = z.object({
  body: z.object({
    username: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    role: z.enum(['user', 'superAdmin']),
  }),
});

 // const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh token is required!',
//     }),
//   }),
// });

export const authValidations = {
  userRegistrationValidation,
  // loginValidationSchema,
  // changePasswordValidationSchema,
  // refreshTokenValidationSchema,
};
