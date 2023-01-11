import prisma from 'infra/prisma';
import { CreateShm, ShareMoment } from 'interfaces/Shm';
import { CreateTag } from 'interfaces/Tag';

export const getAllSharedMoments = async () => {
  return prisma.shareMoment.findMany({});
};

export const createShareMoment = async (inputData: CreateShm) => {
  return prisma.shareMoment.create({
    data: inputData,
  });
};

export async function createTag(inputData: CreateTag) {
  return prisma.tag.create({
    data: inputData,
  });
}

export async function deleteTags(shareMomentId: number) {
  return prisma.tag.deleteMany({
    where: {
      shareMomentId,
    },
  });
}

export async function updateShareMoment(
  id: number,
  inputData: Partial<ShareMoment>
) {
  return prisma.shareMoment.update({
    where: {
      id: id,
    },
    data: inputData,
  });
}

export async function getShareMomentById(id: number) {
  return prisma.shareMoment.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getShareMomentByUserIdSessionId(
  userId: number,
  sessionId: number
) {
  return prisma.shareMoment.findMany({
    where: {
      AND: [{ userId }, { sessionId }],
    },
  });
}

export async function getTaggedMomentIds(userId: number) {
  return prisma.tag.findMany({
    where: {
      userId,
    },
    select: {
      shareMomentId: true,
    },
  });
}

export function getShareMomentByIds(ids: number[], sessionId: number) {
  return prisma.shareMoment.findMany({
    where: {
      AND: [{ sessionId }, { id: { in: ids } }],
    },
  });
}

export function getShareMomentBySessionId(sessionId: number) {
  return prisma.shareMoment.findMany({
    where: {
      sessionId,
    },
  });
}

export async function hasSharedMoment(sessionId: number, userId: number) {
  const sharedMoments = await prisma.shareMoment.findFirst({
    where: {
      AND: [{ sessionId }, { userId }],
    },
  });
  if (sharedMoments) return true;
  return false;
}

export async function deleteSharedMoment(id: number) {
  return prisma.shareMoment.delete({
    where: {
      id,
    },
  });
}
