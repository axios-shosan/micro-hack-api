import { CookieOptions, Request, Response } from 'express';
// import { User } from 'interfaces/User';
import { signToken } from './auth.service';
import Config from 'config/default';
import {
  comparePassowrds,
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../user/user.service';
import { resErr } from 'utils/utils';

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + Config.accessTokenExpiresIn * 60 * 1000),
  maxAge: Config.accessTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

export async function registerController(req: Request, res: Response) {
  try {
    console.log('creating a user', req.body);

    const user = await createUser({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      teamId: req.body.teamId,
      QRcode: req.body.QRcode,
      NFC: req.body.NFC,
      role: req.body.role,
    });
    res.status(200).json(user);
  } catch (error) {
    return resErr(res, 400, error as Error | string);
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) throw new Error('Wrong Email');

    if (!comparePassowrds(req.body.password, user.password))
      throw new Error('Wrong Password');

    const { accessToken } = await signToken(user);
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return resErr(res, 400, error as Error | string);
  }
}

export async function changePasswordController(req: Request, res: Response) {
  try {
    console.log('hi');
    const user = await findUserById(req.context.user.id);
    if (!user) throw new Error('User Doesnt exist on DataBase');

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!comparePassowrds(oldPassword, user.password))
      throw new Error('Wrong Password');

    if (newPassword !== confirmPassword)
      throw new Error('Password Confirmation is Wrong');
    await updateUser(user.id, { password: newPassword });

    res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    return resErr(res, 400, error as Error | string);
  }
}
