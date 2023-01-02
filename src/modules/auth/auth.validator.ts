import { validateRequest } from 'zod-express-middleware';
import { z, object, string, number } from 'zod';

export const loginValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
  }),
  query: z.object({}),
});

export const registerValidator = validateRequest({
  body: object({
    name: string({ required_error: 'Name is Required' }),
    email: string({ required_error: 'Email is Required' }).email({
      message: 'Email Foramt Is Wrong',
    }),
    password: string({ required_error: 'Password Is Required' }),
    teamId: number({ required_error: 'Team Id is Required' }),
    QRcode: string({ required_error: 'QR Code is Required' }),
    NFC: string({ required_error: 'NFC code is Required' }),
    role: number({ required_error: 'Role is Reuqired' }).int().gte(0).lte(1),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});
