// Re-export Zod-inferred types + additional types

export type UserRole = 'tenant' | 'agent' | 'admin';

export type ListingStatus = 'draft' | 'active' | 'expired' | 'archived';

export type SubscriptionTier = 'free' | 'pro' | 'agency' | 'developer';

export type KycStatus = 'pending' | 'submitted' | 'verified' | 'rejected';

export type BadgeType =
    | 'lightning_responder'
    | 'quality_lister'
    | 'verified_pro'
    | 'top_10';

export type LeadStatus = 'new' | 'replied' | 'converted';

export type BlogPostStatus = 'draft' | 'published' | 'scheduled';

export type AdZone =
    | 'homepage_hero'
    | 'search_top'
    | 'district_sidebar'
    | 'blog_inline'
    | 'listing_sidebar'
    | 'email_newsletter'
    | 'short_link';

export interface NestScore {
    responseRate: number;
    avgResponseTime: number;
    freshnessScore: number;
    leadsConverted: number;
    composite: number;
}
