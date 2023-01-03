import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const createCheckInValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    sessionName: z.string({ required_error: 'Session Name is Required' }),
  }),
  query: z.object({}),
});

export const updateCheckInValidator = validateRequest({
  params: z.object({
    id: z.string({ required_error: 'Id is Required In Params' }),
  }),
  body: z.object({
    sessionName: z.string({
      required_error: 'Session Name is Required In request Body',
    }),
  }),
  query: z.object({}),
});

export const deleteCheckInValidator = validateRequest({
  params: z.object({
    id: z.string({ required_error: 'Id is Required In Params' }),
  }),
  body: z.object({}),
  query: z.object({}),
});

export const scanUserValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    checkInId: z.number({
      required_error: 'CheckIn ID is Required In request Body',
    }),
    userCheckInId: z.string({
      required_error: 'User CheckIn Id is Required In request Body',
    }),
  }),
  query: z.object({}),
});
