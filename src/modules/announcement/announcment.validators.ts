import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';
import { idAsParam } from 'lib/validators';

export const createAnnouncementValidatior = validateRequest({
  params: z.object({}),
  body: z.object({
    title: z.string({
      required_error: 'messing data',
    }),
    description: z.string({
      required_error: 'messing data',
    }),
    place: z.string({
      required_error: 'messing data',
    }),
  }),
  query: z.object({}),
});

export const updateAnnouncementhValidator = validateRequest({
  params: idAsParam,
  body: z.object({
    title: z.optional(z.string({})),
    place: z.optional(z.string({})),
    description: z.optional(z.string({})),
  }),
  query: z.object({}),
});

export const deleteAnnouncementValidator = validateRequest({
  params: idAsParam,
  body: z.object({}),
  query: z.object({}),
});
