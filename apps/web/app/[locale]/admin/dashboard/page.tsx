import { db, schema } from '@nestkhmer/shared';
import DashboardClient from './DashboardClient';
import { count, desc } from 'drizzle-orm';
import { Home, Users, TrendingUp, AlertTriangle, Eye, DollarSign, Megaphone } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    // 1. Fetch live metrics from Drizzle
    const [{ count: totalListings }] = await db.select({ count: count() }).from(schema.listings);
    const [{ count: activeAgents }] = await db.select({ count: count() }).from(schema.agents);
    const [{ count: activeAdCampaigns }] = await db.select({ count: count() }).from(schema.adCampaigns);

    // Mock other stats for now, until we build the respective systems (Views, Revenue)
    const stats = [
        { icon: Home, label: 'Total Listings', val: totalListings.toString(), change: '+34', up: true, color: 'var(--color-brand-600)' },
        { icon: Users, label: 'Active Agents', val: activeAgents.toString(), change: '+8', up: true, color: 'var(--color-fresh-600)' },
        { icon: Eye, label: 'Daily Pageviews', val: '8,245', change: '+12%', up: true, color: 'var(--color-warn-600)' },
        { icon: DollarSign, label: 'Monthly Revenue', val: '$12,480', change: '+$1,200', up: true, color: 'var(--color-surface-700)' },
        { icon: AlertTriangle, label: 'Expiring Today', val: '0', change: '', up: false, color: 'var(--color-danger-600)' },
        { icon: Megaphone, label: 'Active Campaigns', val: activeAdCampaigns.toString(), change: '+2', up: true, color: 'var(--color-brand-400)' },
    ];

    // 2. Fetch recent listings and format as recent activity
    const recentListings = await db.select().from(schema.listings).orderBy(desc(schema.listings.createdAt)).limit(5);
    const recentActivity = recentListings.map(listing => ({
        action: 'Listing published',
        detail: `${listing.titleEn} — ${listing.district}`,
        time: listing.createdAt.toLocaleDateString(),
        type: 'listing'
    }));

    // Some mock activity to fill the gap
    recentActivity.push({ action: 'Platform Notice', detail: 'Switched to integrated Next.js CMS', time: 'Just now', type: 'blog' });

    return <DashboardClient stats={stats} recentActivity={recentActivity} />;
}
