import {
    pgTable,
    text,
    timestamp,
    integer,
    boolean,
    real,
    jsonb,
    uuid,
    varchar,
    index,
} from 'drizzle-orm/pg-core';

// ═══════════════════════════════════════════════
// Users
// ═══════════════════════════════════════════════

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    passwordHash: text('password_hash'),
    role: varchar('role', { length: 20 }).notNull().default('tenant'), // tenant | agent | admin
    avatar: text('avatar'),
    locale: varchar('locale', { length: 5 }).default('en'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══════════════════════════════════════════════
// Agents
// ═══════════════════════════════════════════════

export const agents = pgTable(
    'agents',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id)
            .unique(),
        agency: varchar('agency', { length: 255 }),
        bio: text('bio'),
        languages: jsonb('languages').$type<string[]>().default(['en']),
        phone: varchar('phone', { length: 30 }),
        whatsapp: varchar('whatsapp', { length: 30 }),
        photoUrl: text('photo_url'),

        // NestScore metrics
        nestScore: integer('nest_score').default(0),
        responseRate: real('response_rate').default(0), // percentage
        avgResponseTime: integer('avg_response_time').default(0), // minutes
        freshnessScore: real('freshness_score').default(0), // percentage
        leadsConverted: integer('leads_converted').default(0),

        // Badges
        badges: jsonb('badges').$type<string[]>().default([]),

        // KYC
        kycStatus: varchar('kyc_status', { length: 20 }).default('pending'),
        kycDocUrl: text('kyc_doc_url'),

        // Subscription
        subscriptionTier: varchar('subscription_tier', { length: 20 }).default('free'),
        subscriptionExpiresAt: timestamp('subscription_expires_at'),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },
    (table) => [
        index('agents_nest_score_idx').on(table.nestScore),
        index('agents_user_id_idx').on(table.userId),
    ]
);

// ═══════════════════════════════════════════════
// Listings
// ═══════════════════════════════════════════════

export const listings = pgTable(
    'listings',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        agentId: uuid('agent_id')
            .notNull()
            .references(() => agents.id),
        slug: varchar('slug', { length: 300 }).notNull().unique(),
        status: varchar('status', { length: 20 }).notNull().default('draft'),

        // Multilingual content
        titleEn: varchar('title_en', { length: 200 }).notNull(),
        titleKm: varchar('title_km', { length: 200 }),
        titleZh: varchar('title_zh', { length: 200 }),
        descriptionEn: text('description_en').notNull(),
        descriptionKm: text('description_km'),
        descriptionZh: text('description_zh'),

        // Property details
        propertyType: varchar('property_type', { length: 30 }).notNull(),
        district: varchar('district', { length: 100 }).notNull(),
        address: text('address').notNull(),
        lat: real('lat'),
        lng: real('lng'),

        // Pricing
        priceUsd: integer('price_usd').notNull(),
        priceKhr: integer('price_khr'),
        deposit: integer('deposit').notNull(), // months
        leaseTerm: varchar('lease_term', { length: 50 }).notNull(),

        // Specs
        sizeSqm: real('size_sqm').notNull(),
        bedrooms: integer('bedrooms').notNull(),
        bathrooms: integer('bathrooms').notNull(),
        floor: integer('floor').notNull(),
        yearBuilt: integer('year_built').notNull(),

        // Amenities
        furnishing: varchar('furnishing', { length: 20 }).notNull(),
        petPolicy: varchar('pet_policy', { length: 20 }).notNull(),
        electricRate: real('electric_rate').notNull(),
        waterRate: real('water_rate').notNull(),
        internetIncluded: boolean('internet_included').notNull().default(false),
        parking: varchar('parking', { length: 10 }).notNull(),

        // Media
        images: jsonb('images').$type<string[]>().default([]),
        floorPlanUrl: text('floor_plan_url'),
        tourUrl: text('tour_url'),
        videoUrl: text('video_url'),

        // Metadata
        completenessScore: integer('completeness_score').default(0),
        seoTitle: varchar('seo_title', { length: 200 }),
        seoDescription: text('seo_description'),

        // Timestamps — freshness algorithm
        publishedAt: timestamp('published_at'),
        expiresAt: timestamp('expires_at'),
        renewedAt: timestamp('renewed_at'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },
    (table) => [
        index('listings_agent_id_idx').on(table.agentId),
        index('listings_status_idx').on(table.status),
        index('listings_district_idx').on(table.district),
        index('listings_expires_at_idx').on(table.expiresAt),
        index('listings_price_idx').on(table.priceUsd),
    ]
);

// ═══════════════════════════════════════════════
// Districts
// ═══════════════════════════════════════════════

export const districts = pgTable('districts', {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    nameEn: varchar('name_en', { length: 200 }).notNull(),
    nameKm: varchar('name_km', { length: 200 }),
    nameZh: varchar('name_zh', { length: 200 }),
    medianRentSqm: real('median_rent_sqm'),
    avgTimeToLet: real('avg_time_to_let'), // days
    walkabilityScore: integer('walkability_score'),
    listingVolume: integer('listing_volume'),
    lat: real('lat').notNull(),
    lng: real('lng').notNull(),
    heroImageUrl: text('hero_image_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══════════════════════════════════════════════
// Leads
// ═══════════════════════════════════════════════

export const leads = pgTable(
    'leads',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        listingId: uuid('listing_id')
            .notNull()
            .references(() => listings.id),
        agentId: uuid('agent_id')
            .notNull()
            .references(() => agents.id),
        tenantName: varchar('tenant_name', { length: 255 }).notNull(),
        tenantEmail: varchar('tenant_email', { length: 255 }).notNull(),
        tenantPhone: varchar('tenant_phone', { length: 30 }),
        message: text('message').notNull(),
        status: varchar('status', { length: 20 }).notNull().default('new'),
        responseTime: integer('response_time'), // minutes
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },
    (table) => [
        index('leads_agent_id_idx').on(table.agentId),
        index('leads_listing_id_idx').on(table.listingId),
        index('leads_status_idx').on(table.status),
    ]
);

// ═══════════════════════════════════════════════
// Blog Posts
// ═══════════════════════════════════════════════

export const blogPosts = pgTable(
    'blog_posts',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        slug: varchar('slug', { length: 300 }).notNull().unique(),
        titleEn: varchar('title_en', { length: 300 }).notNull(),
        titleKm: varchar('title_km', { length: 300 }),
        titleZh: varchar('title_zh', { length: 300 }),
        contentEn: text('content_en').notNull(),
        contentKm: text('content_km'),
        contentZh: text('content_zh'),
        authorId: uuid('author_id').references(() => users.id),
        category: varchar('category', { length: 100 }),
        status: varchar('status', { length: 20 }).notNull().default('draft'),
        publishedAt: timestamp('published_at'),
        seoTitle: varchar('seo_title', { length: 200 }),
        seoDescription: text('seo_description'),
        ogImage: text('og_image'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },
    (table) => [
        index('blog_posts_slug_idx').on(table.slug),
        index('blog_posts_status_idx').on(table.status),
    ]
);

// ═══════════════════════════════════════════════
// Ad Campaigns
// ═══════════════════════════════════════════════

export const adCampaigns = pgTable('ad_campaigns', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    zone: varchar('zone', { length: 50 }).notNull(),
    creativeUrl: text('creative_url').notNull(),
    linkUrl: text('link_url').notNull(),
    shortUrl: text('short_url'),

    // UTM
    utmSource: varchar('utm_source', { length: 100 }).default('nestkhmer'),
    utmMedium: varchar('utm_medium', { length: 50 }).default('banner'),
    utmCampaign: varchar('utm_campaign', { length: 200 }),
    utmContent: varchar('utm_content', { length: 200 }),

    // Dates & Caps
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    impressionCap: integer('impression_cap'),
    clickCap: integer('click_cap'),
    impressions: integer('impressions').default(0),
    clicks: integer('clicks').default(0),
    status: varchar('status', { length: 20 }).notNull().default('active'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══════════════════════════════════════════════
// Ad Impressions
// ═══════════════════════════════════════════════

export const adImpressions = pgTable(
    'ad_impressions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        campaignId: uuid('campaign_id')
            .notNull()
            .references(() => adCampaigns.id),
        timestamp: timestamp('timestamp').defaultNow().notNull(),
        ip: varchar('ip', { length: 45 }),
        userAgent: text('user_agent'),
        country: varchar('country', { length: 5 }),
    },
    (table) => [
        index('ad_impressions_campaign_id_idx').on(table.campaignId),
    ]
);
