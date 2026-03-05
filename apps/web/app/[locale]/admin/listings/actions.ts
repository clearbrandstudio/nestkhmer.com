'use server';

import { db, schema } from '@nestkhmer/shared';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function createListingAndRevalidate(formData: any) {
    try {
        // Needs an agent to assign the listing to, let's just pick the first agent if not provided
        let assignAgentId = formData.agentId;
        if (!assignAgentId) {
            const firstAgent = await db.select({ id: schema.agents.id }).from(schema.agents).limit(1);
            if (firstAgent.length > 0) {
                assignAgentId = firstAgent[0].id;
            } else {
                return { error: 'No agents available to assign. Please create an agent first.' };
            }
        }

        const slug = `NK-${formData.district.replace(/\s+/g, '-').toUpperCase()}-${Math.floor(Math.random() * 10000)}`;

        await db.insert(schema.listings).values({
            agentId: assignAgentId,
            slug,
            titleEn: formData.title,
            descriptionEn: formData.description || 'Description pending...',
            propertyType: formData.type,
            district: formData.district,
            address: 'TBD', // default
            priceUsd: parseInt(formData.price) || 0,
            deposit: 1, // default
            leaseTerm: '1 Year', // default
            sizeSqm: parseInt(formData.size) || 0,
            bedrooms: parseInt(formData.bedrooms.replace('+', '').replace('Studio', '0')) || 0,
            bathrooms: parseInt(formData.bathrooms.replace('+', '')) || 1,
            floor: parseInt(formData.floor) || 1,
            yearBuilt: new Date().getFullYear(),
            furnishing: 'fully', // default
            petPolicy: 'allowed', // default
            electricRate: 0.25,
            waterRate: 0.75,
            internetIncluded: true,
            parking: '1',
            status: 'active',
            // Default images if any
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop'],
        });

        revalidatePath('/[locale]/admin/listings', 'page');
        revalidatePath('/[locale]/listings', 'page');
        revalidatePath('/[locale]', 'page');

        return { success: true };
    } catch (e: any) {
        return { error: e.message || 'Failed to create listing' };
    }
}

export async function updateListingStatus(id: string, newStatus: string) {
    try {
        await db.update(schema.listings).set({ status: newStatus }).where(eq(schema.listings.id, id));
        revalidatePath('/[locale]/admin/listings', 'page');
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteListingById(id: string) {
    try {
        await db.delete(schema.listings).where(eq(schema.listings.id, id));
        revalidatePath('/[locale]/admin/listings', 'page');
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}
