import { db, schema } from '@nestkhmer/shared';
import ListingsClient from './ListingsClient';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AdminListingsPage() {
    // 1. Fetch live listings
    const rawListings = await db.select({
        id: schema.listings.id,
        propertyId: schema.listings.slug,
        title: schema.listings.titleEn,
        agentId: schema.listings.agentId,
        district: schema.listings.district,
        price: schema.listings.priceUsd,
        status: schema.listings.status,
        score: schema.listings.completenessScore,
        createdAt: schema.listings.createdAt
    }).from(schema.listings).orderBy(desc(schema.listings.createdAt));

    // 2. Fetch agents to resolve names and for assignment
    const agents = await db.select({
        id: schema.agents.id,
        name: schema.users.name,
    })
        .from(schema.agents)
        .innerJoin(schema.users, eq(schema.agents.userId, schema.users.id));

    const agentMap = new Map(agents.map(a => [a.id, a.name]));

    // 3. Fetch districts
    const districtsReq = await db.select({ name: schema.districts.nameEn }).from(schema.districts);
    const districtsList = districtsReq.length > 0 ? districtsReq.map(d => d.name) : ['BKK1', 'Toul Kork', 'Daun Penh', 'Sen Sok', 'Koh Pich']; // Fallback in case DB is empty

    // Format for the client
    const initialListings = rawListings.map(l => {
        // approximate days old
        const diffTime = Math.abs(new Date().getTime() - new Date(l.createdAt).getTime());
        const daysOld = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            id: l.id,
            propertyId: l.propertyId,
            title: l.title,
            agent: agentMap.get(l.agentId) || 'Unknown Agent',
            district: l.district,
            price: l.price,
            status: l.status,
            score: l.score || 80,
            daysOld,
        };
    });

    return (
        <ListingsClient
            initialListings={initialListings}
            districtsList={districtsList}
            agentsList={agents}
        />
    );
}
