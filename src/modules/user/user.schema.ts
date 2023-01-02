import { number, object, string, date } from 'zod';

export const userSchema = object({
  id: number({ required_error: 'Id is Required' }),
  name: string({ required_error: 'Name is Required' }),
  email: string({ required_error: 'Email is Required' }).email({
    message: 'Email Foramt Is Wrong',
  }),
  password: string({ required_error: 'Password Is Required' }),
  teamId: number({ required_error: 'Team Id is Required' }),
  Qrcode: string({ required_error: 'QR Code is Required' }),
  NFC: string({ required_error: 'NFC code is Required' }),
  role: number({ required_error: 'Role is Reuqired' }).int().gte(0).lte(1),
  createdAt: date({ required_error: 'Created At is Requried' }),
  updatedAt: date({ required_error: 'Updated At is Requried' }),
});

// export type CreateUserInput = TypeOf<typeof createuserschema="">['body'];
// export type LoginUserInput = TypeOf<typeof loginuserschema="">['body'];
