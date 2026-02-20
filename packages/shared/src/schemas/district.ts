import { z } from 'zod';

export const districtSchema = z.object({
    nameEn: z.string(),
    nameKm: z.string().optional(),
    nameZh: z.string().optional(),
    slug: z.string(),
    medianRentSqm: z.number().optional(),
    avgTimeToLet: z.number().optional(),
    walkabilityScore: z.number().min(0).max(100).optional(),
    listingVolume: z.number().optional(),
    lat: z.number(),
    lng: z.number(),
    heroImageUrl: z.string().url().optional(),
});

export type DistrictInput = z.infer<typeof districtSchema>;
