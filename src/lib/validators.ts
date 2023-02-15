import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';

export const emptyValidator = validateRequest({
  params: z.object({}),
  body: z.object({}),
  query: z.object({}),
});
