import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const shareMomentValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),

    tags: z.optional(z.string({})),
  }),
  query: z.object({}),
});

export const updateShareMomentValidator = validateRequest({
  params: z.object({
    id: z.string({
      required_error: 'Id is required In Params',
    }),
  }),
  body: z.object({
    title: z.optional(
      z.string({
        required_error: 'Title is required',
      })
    ),
    tags: z.optional(z.array(z.string({}))),
  }),
  query: z.object({}),
});

export const emptyValidator = validateRequest({
  params: z.object({}),
  body: z.object({}),
  query: z.object({}),
});
