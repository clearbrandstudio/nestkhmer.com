import { NextRequest, NextResponse } from 'next/server';
import { db, schema, auth } from '@nestkhmer/shared';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        // Authenticate the user securely
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session || !session.user || session.user.role !== 'agent') {
            return NextResponse.json({ error: 'Unauthorized or not an agent' }, { status: 401 });
        }

        // Get Agent record for user
        const agentRecord = await db.query.agents.findFirst({
            where: eq(schema.agents.userId, session.user.id)
        });

        if (!agentRecord) {
            return NextResponse.json({ error: 'Agent profile not found' }, { status: 404 });
        }

        const body = await req.json();

        // 1. Generate Slug
        const generateSlug = (title: string) => {
            return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
        };

        const titleEn = body.titleEn || 'Untitled Property';

        // 2. Insert into database
        const newListing = await db.insert(schema.listings).values({
            agentId: agentRecord.id,
            slug: generateSlug(titleEn),
            status: body.status || 'draft',
            titleEn: titleEn,
            descriptionEn: body.descriptionEn || '',
            propertyType: body.propertyType || 'Apartment',
            district: body.district || 'BKK1',
            address: body.address || '',
            lat: Number(body.lat) || null,
            lng: Number(body.lng) || null,
            priceUsd: Number(body.priceUsd) || 0,
            deposit: Number(body.deposit) || 1,
            leaseTerm: body.leaseTerm || '1 Year',
            sizeSqm: Number(body.sizeSqm) || 0,
            bedrooms: Number(body.bedrooms) || 1,
            bathrooms: Number(body.bathrooms) || 1,
            floor: Number(body.floor) || 1,
            yearBuilt: Number(body.yearBuilt) || new Date().getFullYear(),
            furnishing: body.furnishing || 'Fully Furnished',
            petPolicy: body.petPolicy || 'Not Allowed',
            electricRate: Number(body.electricRate) || 0.25,
            waterRate: Number(body.waterRate) || 5,
            internetIncluded: Boolean(body.internetIncluded),
            parking: body.parking || 'Available',
            images: body.images || [],
            publishedAt: body.status === 'active' ? new Date() : null,
            expiresAt: body.status === 'active' ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : null,
        }).returning();

        return NextResponse.json(newListing[0]);
    } catch (error: any) {
        console.error('Error creating listing:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session || !session.user || session.user.role !== 'agent') {
            return NextResponse.json({ error: 'Unauthorized or not an agent' }, { status: 401 });
        }

        // Get Agent record for user
        const agentRecord = await db.query.agents.findFirst({
            where: eq(schema.agents.userId, session.user.id)
        });

        if (!agentRecord) {
            return NextResponse.json({ error: 'Agent profile not found' }, { status: 404 });
        }

        // Fetch Agent's listings
        const agentListings = await db.query.listings.findMany({
            where: eq(schema.listings.agentId, agentRecord.id),
            orderBy: (listings, { desc }) => [desc(listings.createdAt)]
        });

        // Format for frontend
        const formattedListings = agentListings.map(l => {
            const daysOld = l.publishedAt ? Math.floor((Date.now() - l.publishedAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;
            return {
                id: l.id,
                title: l.titleEn,
                district: l.district,
                price: l.priceUsd,
                status: l.status,
                views: 0, // Mock for now until tracking is implemented
                leads: 0, // Mock for now until tracking is implemented
                daysOld: daysOld,
                image: l.images && l.images.length > 0 ? l.images[0] : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop'
            };
        });

        return NextResponse.json(formattedListings);
    } catch (error: any) {
        console.error('Error fetching listings:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
