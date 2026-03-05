import { db, schema } from '@nestkhmer/shared';
import BlogClient from './BlogClient';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
    // Fetch live blog posts
    const rawPosts = await db.select().from(schema.blogPosts).orderBy(desc(schema.blogPosts.createdAt));

    // Format for the client
    const initialPosts = rawPosts.map(p => ({
        id: p.id,
        title: p.titleEn,
        category: p.category || 'General',
        status: p.status,
        author: 'Admin', // In a real app, join with users table
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : new Date(p.createdAt).toLocaleDateString(),
        views: 0 // Fetch from analytics if available
    }));

    return <BlogClient initialPosts={initialPosts} />;
}
