import { z } from "zod";

export const ImageQuerySchema = z.object({
  query: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(50).default(8)
});