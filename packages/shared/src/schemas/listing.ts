import { z } from 'zod';

// ─── Property Types ───
export const propertyTypes = [
    'apartment',
    'house',
    'villa',
    'condo',
    'studio',
    'shophouse',
    'penthouse',
    'room',
] as const;

export const furnishingLevels = ['unfurnished', 'semi-furnished', 'fully-furnished'] as const;
export const petPolicies = ['allowed', 'not-allowed', 'negotiable'] as const;
export const parkingOptions = ['yes', 'no', 'paid'] as const;
export const listingStatuses = ['draft', 'active', 'expired', 'archived'] as const;

// ─── Create Listing Schema ───
export const createListingSchema = z.object({
    // Required fields (Completeness Gate)
    titleEn: z.string().min(5).max(200),
    titleKm: z.string().max(200).optional(),
    titleZh: z.string().max(200).optional(),

    descriptionEn: z.string().min(100).max(5000),
    descriptionKm: z.string().max(5000).optional(),
    descriptionZh: z.string().max(5000).optional(),

    propertyType: z.enum(propertyTypes),
    district: z.string().min(1),
    address: z.string().min(5),
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional(),

    priceUsd: z.number().positive(),
    priceKhr: z.number().positive().optional(),
    deposit: z.number().min(0), // months
    leaseTerm: z.string().min(1),

    sizeSqm: z.number().positive(),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().int().min(0),
    floor: z.number().int(),
    yearBuilt: z.number().int().min(1900).max(2030),

    furnishing: z.enum(furnishingLevels),
    petPolicy: z.enum(petPolicies),
    electricRate: z.number().positive(), // per kWh
    waterRate: z.number().positive(), // per cubic metre
    internetIncluded: z.boolean(),
    parking: z.enum(parkingOptions),

    // Images: minimum 5 required
    images: z.array(z.string().url()).min(5).max(30),

    // Optional but rewarded
    floorPlanUrl: z.string().url().optional(),
    tourUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
});

export const updateListingSchema = createListingSchema.partial();

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
