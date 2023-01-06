import prisma from 'infra/prisma';
import { CreateShmSession, ShareMomentSesssion } from 'interfaces/ShmSession';

export async function createShmSession(inputData: CreateShmSession) {
  if (inputData.active === true) await desactivateShmSessions();
  return prisma.shareMomentSession.create({
    data: inputData,
  });
}

export async function desactivateShmSessions() {
  return prisma.shareMomentSession.updateMany({
    where: {
      active: true,
    },
    data: {
      active: false,
    },
  });
}

export async function updateShmSession(
  id: number,
  inputData: Partial<ShareMomentSesssion>
) {
  if (inputData.hasOwnProperty('active') && inputData.active === true)
    await desactivateShmSessions();
  return prisma.shareMomentSession.update({
    where: {
      id,
    },
    data: inputData,
  });
}

export async function getShmSessionById(id: number) {
  return prisma.shareMomentSession.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteShmSession(id: number) {
  return prisma.shareMomentSession.delete({
    where: {
      id,
    },
  });
}

export async function getActiveShmSession(): Promise<number> {
  const shmSessions = await prisma.shareMomentSession.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    where: {
      active: true,
    },
    select: {
      id: true,
    },
  });

  return shmSessions[0].id;
}
