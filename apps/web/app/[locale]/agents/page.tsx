import { db, schema } from '@nestkhmer/shared';
import { eq, sql } from 'drizzle-orm';
import { Shield, Star, Zap, Award, Search, ArrowRight, X, Mail, Phone, MessageSquare } from 'lucide-react';
import React from 'react';
import { AgentsClient } from './AgentsClient';

export default async function AgentsPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    let dbAgents: any[] = [];
    try {
        // Fetch agents joined with their user profile data
        dbAgents = await db
            .select({
                id: schema.agents.id,
                agency: schema.agents.agency,
                score: schema.agents.nestScore,
                name: schema.users.name,
                avatar: schema.users.avatar,
            })
            .from(schema.agents)
            .innerJoin(schema.users, eq(schema.agents.userId, schema.users.id))
            .limit(20);
    } catch (e) {
        console.error("Agents fetch error:", e);
    }

    const mappedAgents = dbAgents.map(a => {
        try {
            return {
                name: a.name || 'Professional Agent',
                agency: a.agency || 'Independent',
                tier: 'standard', // fallback until tier is in schema/mapped
                avatar: a.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name || 'Agent')}&background=random`,
                score: a.score || 85,
                responseRate: 95,
                avgResponse: '15m',
                listings: 0,
                badges: ['verified', 'quality'],
                slug: a.id
            };
        } catch (mapErr) {
            return null;
        }
    }).filter(Boolean);

    return (
        <div className="min-h-screen pb-32" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
            <AgentsClient initialAgents={mappedAgents as any[]} locale={locale} />
        </div>
    );
}

