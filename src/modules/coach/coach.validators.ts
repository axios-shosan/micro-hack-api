import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

const idAsParam = z.object({
  id: z.string({
    required_error: 'missin data',
  }),
});

export const craeteCoachValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    name: z.string({
      required_error: 'missing data',
    }),
  }),
  query: z.object({}),
});

export const updateCoachValidator = validateRequest({
  params: idAsParam,
  body: z.object({
    name: z.optional(z.string({})),
    active: z.optional(z.boolean({})),
  }),
  query: z.object({}),
});

export const deleteCoachValidator = validateRequest({
  params: idAsParam,
  body: z.object({}),
  query: z.object({}),
});

export const requestCoachValidator = validateRequest({
  params: z.object({}),
  body: z.object({
    coachId: z.number({
      required_error: 'missing data',
    }),
  }),
  query: z.object({}),
});

export const updateRequestValidator = validateRequest({
  params: idAsParam,
  body: z.object({
    status: z.optional(z.number({})),
    archived: z.optional(z.boolean({})),
  }),
  query: z.object({}),
});
