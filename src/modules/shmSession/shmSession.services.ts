import prisma from 'infra/prisma';
import { CreateShm, ShareMomentSesssion } from 'interfaces/Shm';

export async function createShmSession(inputData: CreateShm) {
  return prisma.shareMomentSession.create({
    data: inputData,
  });
}

export async function updateShmSession(
  id: number,
  inputData: Partial<ShareMomentSesssion>
) {
  return prisma.shareMomentSession.update({
    where: {
      id,
    },
    data: inputData,
  });
}
