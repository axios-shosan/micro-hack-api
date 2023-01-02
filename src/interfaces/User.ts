enum Role {
  USER,
  ADMIN,
}

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  teamId: number;
  QRcode: string;
  NFC: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUser {
  email: string;
  password: string;
  name: string;
  teamId: number;
  QRcode: string;
  NFC: string;
  role: Role;
}

export { User, CreateUser, Role };
