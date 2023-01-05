// import { omit, get } from 'lodash';
// import { FilterQuery, QueryOptions } from 'mongoose';
// import config from 'config';
// import userModel, { User } from '../models/user.model';
// import { excludedFields } from '../controllers/auth.controller';
// import redisClient from 'utils/connectRedis';
// import { signJwt } from 'utils/jwt';
import { CreateUser, User } from 'interfaces/User';
import prisma from 'infra/prisma';
import bcrypt from 'bcrypt';
import Config from 'config/default';
// import { signJwt } from 'src/modules/auth/auth.service';
// import cofing from "config/default"

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, Config.bcryptSalt);
}

export function comparePassowrds(
  inputPassword: string,
  originalPassword: string
): boolean {
  return bcrypt.compareSync(inputPassword, originalPassword);
}
// CreateUser service
export const createUser = async (userInput: CreateUser) => {
  const user = {
    ...userInput,
    password: hashPassword(userInput.password),
  };
  return prisma.user.create({ data: user });
};

//Find User By Email
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

// Find User by Id
export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

// Find All users
export const findAllUsers = async () => {
  return prisma.user.findMany();
};

//Update User
export const updateUser = async (id: number, data: Partial<User>) => {
  if (data.password) data.password = hashPassword(data.password);

  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};
