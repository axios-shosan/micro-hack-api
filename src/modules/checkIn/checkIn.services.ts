import prisma from 'infra/prisma';
import { CheckIn, CreateCheckIn, CreateCheckInUser } from 'interfaces/CheckIn';

export async function findAllCheckIn() {
  return prisma.checkIn.findMany();
}

export async function createCheckIn(inputData: CreateCheckIn) {
  return prisma.checkIn.create({ data: inputData });
}

export async function updateCheckIn(id: number, inputData: Partial<CheckIn>) {
  return prisma.checkIn.update({
    where: {
      id,
    },
    data: inputData,
  });
}

export async function deleteCheckIn(id: number) {
  return prisma.checkIn.delete({
    where: {
      id,
    },
  });
}

export async function findCheckInUserByIds(
  checkInId: number,
  userCheckInId: string
) {
  return prisma.checkInUser.findMany({
    where: {
      checkInId,
      userCheckInId,
    },
  });
}

export async function createCheckInUser(inputData: CreateCheckInUser) {
  return prisma.checkInUser.create({
    data: inputData,
  });
}
