import { Role } from './User';

interface JwtPayload {
  id: number;
  email: string;
  name: string;
  teamId: number;
  checkInId: string;
  role: Role;
}

export { JwtPayload };
