import { Request, Response, NextFunction } from 'express';
import { User, Role } from 'interfaces/User';
import { decodeJwt } from 'modules/auth/auth.service';
import { findUserById } from 'modules/user/user.service';
import { resErr } from 'utils/utils';

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get access Toekn from Header
    const accessToken = req.headers.authorization?.slice(7);
    if (!accessToken) throw new Error('User Is not Logged In');

    const user = decodeJwt(accessToken);
    if (!user) throw new Error('Invalid Access Token');

    req.context.user = user;

    return next();
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    //get Access Token from Headers
    const accessToken = req.headers.authorization?.slice(7);
    if (!accessToken) throw new Error('Invalid Access Token');

    //Decode the Access Token
    const decoded: User | null = decodeJwt(accessToken);
    if (!decoded) throw new Error('User Is not Logged In');

    //extra security: check if user exists in Database
    const user = await findUserById(decoded.id);
    if (!user) throw new Error('Invalid ID');

    //Chack the found user in db if he is Admin or no
    if (user.role === Role.ADMIN) {
      req.context.user = user;
      return next();
    }
    throw new Error('User is Not Admin');
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
