import prisma from 'infra/prisma';
import { CreateShmSession, ShareMomentSesssion } from 'interfaces/ShmSession';

export async function createShmSession(inputData: CreateShmSession) {
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
