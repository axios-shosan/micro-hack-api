import prisma from 'infra/prisma';
import { CreateShm } from 'interfaces/Shm';
import { CreateTag } from 'interfaces/Tag';

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
