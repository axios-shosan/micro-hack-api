import prisma from 'infra/prisma';
import {
  Coach,
  CraeteCoach,
  RequestCoach,
  createRequestCoach,
} from 'interfaces/Coach';

export const createCoach = (inputData: CraeteCoach) => {
  return prisma.coach.create({
    data: inputData,
  });
};

export async function updateCoach(id: number, inputData: Partial<Coach>) {
  return prisma.coach.update({
    where: {
      id: id,
    },
    data: inputData,
  });
}

export async function deleteCoach(id: number) {
  return prisma.coach.delete({
    where: {
      id,
    },
  });
}

export async function getCoachById(id: number) {
  return prisma.coach.findUnique({
    where: {
      id,
    },
  });
}

export async function getAllCoaches() {
  return prisma.coach.findMany({});
}

export async function getActiveCoahces() {
  return prisma.coach.findMany({
    where: {
      active: true,
    },
  });
}

export async function createRequestCoach(inputData: createRequestCoach) {
  return prisma.requestCoach.create({
    data: inputData,
  });
}

export async function updateRequestCoach(
  id: number,
  inputData: Partial<RequestCoach>
) {
  return prisma.requestCoach.update({
    where: {
      id,
    },
    data: inputData,
  });
}
