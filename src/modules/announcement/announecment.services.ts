import prisma from 'infra/prisma';
import { Announcement, CreateAnnouncement } from 'interfaces/Announcement';

export async function createAnnouncement(inputData: CreateAnnouncement) {
  return prisma.announcement.create({
    data: inputData,
  });
}

export async function updateAnnouncement(
  id: number,
  inputData: Partial<Announcement>
) {
  return prisma.announcement.update({
    where: {
      id,
    },
    data: inputData,
  });
}

export async function delteAnnouncement(id: number) {
  return prisma.announcement.delete({
    where: {
      id,
    },
  });
}

export async function getAllAnnouncements() {
  return prisma.announcement.findMany({});
}

export async function getLastAnnouncement() {
  return prisma.announcement.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
}
