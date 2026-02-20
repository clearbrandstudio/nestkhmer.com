import { z } from 'zod';

export const subscriptionTiers = ['free', 'pro', 'agency', 'developer'] as const;
export const kycStatuses = ['pending', 'submitted', 'verified', 'rejected'] as const;

export const badgeTypes = [
    'lightning_responder',
    'quality_lister',
    'verified_pro',
    'top_10',
] as const;

export const agentProfileSchema = z.object({
    bio: z.string().max(1000).optional(),
    agency: z.string().max(200).optional(),
    languages: z.array(z.string()).default(['en']),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    photoUrl: z.string().url().optional(),
});

export type AgentProfileInput = z.infer<typeof agentProfileSchema>;
