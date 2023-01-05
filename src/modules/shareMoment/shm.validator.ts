import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const shareMomentValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),

    sessionId: z.string({
      required_error: 'Session Id is required',
    }),

    tags: z.optional(z.array(z.string({}))),
  }),
  query: z.object({}),
});
