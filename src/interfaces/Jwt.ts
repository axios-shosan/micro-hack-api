import { Role } from './User';

interface JwtPayload {
  id: number;
  email: string;
  name: string;
  teamId: number;
  QRcode: string;
  NFC: string;
  role: Role;
}

export { JwtPayload };
