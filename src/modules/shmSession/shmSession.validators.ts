import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const createShmSessionValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    sessionName: z.string({
      required_error: 'Session Name is Required In request Body',
    }),
    active: z.boolean({
      required_error: 'Active is Required In request Body',
    }),
  }),
  query: z.object({}),
});

export const updateShmSessionValidator = validateRequest({
  params: z.object({
    id: z.string({ required_error: 'Id is Required In Params' }),
  }),
  body: z.object({
    sessionName: z.optional(
      z.string({
        required_error: 'Session Name is Required In request Body',
      })
    ),
    active: z.optional(
      z.boolean({
        required_error: 'Active is Required In request Body',
      })
    ),
  }),
  query: z.object({}),
});

export const createShmValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    sessionName: z.string({
      required_error: 'Session Name is Required In request Body',
    }),
    active: z.boolean({
      required_error: 'Active is Required In request Body',
    }),
  }),
  query: z.object({}),
});
