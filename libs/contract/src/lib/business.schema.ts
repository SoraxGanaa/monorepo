import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  address: z.string(),
  phone: z.string(),
  email: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  facebookUrl: z.string().nullable().optional(),
  instagramUrl: z.string().nullable().optional(),
  timetable: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
  categoryId: z.string(),
  category: CategorySchema.optional(), // include хийвэл ирнэ
});

export type Business = z.infer<typeof BusinessSchema>;

export const BusinessListResponseSchema = z.object({
  data: z.array(BusinessSchema),
});
export type BusinessListResponse = z.infer<typeof BusinessListResponseSchema>;
