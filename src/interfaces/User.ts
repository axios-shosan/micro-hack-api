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
  checkInId: string;
  points: number;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUser {
  email: string;
  password: string;
  name: string;
  teamId: number;
  checkInId: string;
  role: Role;
}

export { User, CreateUser, Role };
