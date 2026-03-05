'use server';

import { db, schema } from '@nestkhmer/shared';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function getBlogPostById(id: string) {
    try {
        const post = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.id, id)).limit(1);
        if (post.length === 0) return { error: 'Post not found' };

        const p = post[0];
        // Parse content blocks from JSON if they were stored that way
        let blocks = [];
        try {
            blocks = JSON.parse(p.contentEn || '[]');
        } catch (e) {
            // fallback if it's just plain text
            blocks = [{ id: '1', type: 'text', content: p.contentEn }];
        }

        return {
            success: true,
            post: {
                id: p.id,
                title: p.titleEn,
                titleKm: p.titleKm || '',
                titleZh: p.titleZh || '',
                slug: p.slug,
                type: 'post',
                status: p.status,
                category: p.category || '',
                tags: [], // Tags not yet in schema as separate field, maybe use category or JSON
                metaTitle: p.seoTitle || '',
                metaDescription: p.seoDescription || '',
                featuredImage: p.ogImage || '',
                blocks
            }
        };
    } catch (e: any) {
        return { error: e.message || 'Failed to fetch post' };
    }
}

export async function saveBlogPostAction(data: any, blocks: any[]) {
    try {
        const isUpdate = !!data.id;
        const blocksJson = JSON.stringify(blocks);

        const postData = {
            titleEn: data.title,
            titleKm: data.titleKm,
            titleZh: data.titleZh,
            slug: data.slug || `post-${Date.now()}`,
            contentEn: blocksJson, // Storing blocks as JSON in the main content field
            category: data.category,
            status: data.status,
            seoTitle: data.metaTitle,
            seoDescription: data.metaDescription,
            ogImage: data.featuredImage,
            updatedAt: new Date(),
        };

        if (isUpdate) {
            await db.update(schema.blogPosts).set(postData).where(eq(schema.blogPosts.id, data.id));
        } else {
            await db.insert(schema.blogPosts).values({
                ...postData,
                createdAt: new Date(),
            });
        }

        revalidatePath('/[locale]/admin/blog', 'page');
        revalidatePath('/[locale]/blog', 'page');

        return { success: true };
    } catch (e: any) {
        return { error: e.message || 'Failed to save post' };
    }
}
