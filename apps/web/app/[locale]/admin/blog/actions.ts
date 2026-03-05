'use server';

import { db, schema } from '@nestkhmer/shared';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function deleteBlogPost(id: string) {
    try {
        await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
        revalidatePath('/[locale]/admin/blog', 'page');
        revalidatePath('/[locale]/blog', 'page');
        return { success: true };
    } catch (e: any) {
        return { error: e.message || 'Failed to delete blog post' };
    }
}

export async function updateBlogPostStatus(id: string, newStatus: string) {
    try {
        await db.update(schema.blogPosts).set({
            status: newStatus,
            publishedAt: newStatus === 'published' ? new Date() : null,
            updatedAt: new Date()
        }).where(eq(schema.blogPosts.id, id));

        revalidatePath('/[locale]/admin/blog', 'page');
        revalidatePath('/[locale]/blog', 'page');
        return { success: true };
    } catch (e: any) {
        return { error: e.message || 'Failed to update post status' };
    }
}
