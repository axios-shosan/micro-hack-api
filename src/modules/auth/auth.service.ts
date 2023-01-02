import Config from 'config/default';
import { User } from 'interfaces/User';
import { JwtPayload } from 'interfaces/Jwt';
import jwt, { SignOptions } from 'jsonwebtoken';

export const signJwt = (payload: JwtPayload, options: SignOptions = {}) => {
  console.log('JWT Payload', payload);
  const privateKey = Buffer.from(
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    'base64'
  ).toString('ascii');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const decodeJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};

export const signToken = async (user: User) => {
  // Sign the access token
  const accessToken = signJwt(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      teamId: user.teamId,
      checkInId: user.checkInId,
      role: user.role,
    },
    {
      expiresIn: `${Config.accessTokenExpiresIn}d`,
    }
  );

  //   // Create a Session
  //   redisClient.set(user._id, JSON.stringify(user), {
  //     EX: 60 * 60,
  //   });

  // Return access token
  return { accessToken };
};
