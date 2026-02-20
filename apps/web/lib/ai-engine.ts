/* ─── AI / LLM Engine ─── */

export interface AIConfig {
    provider: 'openrouter' | 'ollama' | 'openai';
    model: string;
    apiKey: string;
    baseUrl: string;
}

const CONFIG_KEY = 'nestkhmer_ai_config';

export function getAIConfig(): AIConfig {
    try {
        const raw = localStorage.getItem(CONFIG_KEY);
        if (raw) return JSON.parse(raw);
    } catch { }
    return {
        provider: 'openrouter',
        model: 'meta-llama/llama-3.1-8b-instruct',
        apiKey: '',
        baseUrl: 'https://openrouter.ai/api/v1',
    };
}

export function saveAIConfig(config: AIConfig) {
    try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch { }
}

/* ─── Unified Chat Completion ─── */
export async function aiComplete(prompt: string, systemPrompt?: string): Promise<string> {
    const config = getAIConfig();
    if (!config.apiKey && config.provider !== 'ollama') {
        return '[AI not configured — add API key in Admin > Settings]';
    }

    const baseUrl = config.provider === 'ollama'
        ? 'http://localhost:11434/v1'
        : config.baseUrl;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (config.apiKey) {
        headers['Authorization'] = `Bearer ${config.apiKey}`;
    }
    if (config.provider === 'openrouter') {
        headers['HTTP-Referer'] = 'https://nestkhmer.com';
        headers['X-Title'] = 'NestKhmer AI';
    }

    try {
        const res = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: config.model,
                messages: [
                    ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
                    { role: 'user', content: prompt },
                ],
                max_tokens: 500,
                temperature: 0.7,
            }),
        });
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '[No response from AI]';
    } catch (err) {
        return `[AI Error: ${err instanceof Error ? err.message : 'Unknown error'}]`;
    }
}

/* ─── High-Value AI Functions ─── */

/** Generate SEO listing description from specs */
export async function generateListingDescription(specs: {
    title: string;
    district: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    amenities?: string[];
}): Promise<string> {
    return aiComplete(
        `Write a compelling 2-sentence rental listing description for: ${specs.title} in ${specs.district}, $${specs.price}/mo, ${specs.bedrooms}BR/${specs.bathrooms}BA, ${specs.size}sqm. ${specs.amenities?.length ? 'Amenities: ' + specs.amenities.join(', ') : ''}. Keep it concise, highlight lifestyle benefits, and be persuasive.`,
        'You are a Cambodia real estate copywriter. Write in natural English. No hashtags. No exclamation marks. Professional tone.'
    );
}

/** Generate daily market pulse summary */
export async function generateMarketPulse(data: {
    totalListings: number;
    newToday: number;
    avgPrice: number;
    topDistrict: string;
    rentedToday: number;
}): Promise<string> {
    return aiComplete(
        `Generate a 3-sentence daily market pulse for Phnom Penh rentals. Data: ${data.totalListings} active listings, ${data.newToday} new today, avg $${data.avgPrice}/mo, hottest district: ${data.topDistrict}, ${data.rentedToday} rented today.`,
        'You are a Phnom Penh real estate market analyst. Write concise, data-driven insights. No fluff.'
    );
}

/** Score listing quality (0-100) */
export async function scoreListingQuality(listing: {
    title: string;
    description: string;
    photoCount: number;
    hasPrice: boolean;
    hasUtilityRates: boolean;
    agentResponseTime: number;
}): Promise<number> {
    const response = await aiComplete(
        `Rate this rental listing quality 0-100. Title: "${listing.title}". Description: "${listing.description}". Photos: ${listing.photoCount}. Has price: ${listing.hasPrice}. Has utility rates: ${listing.hasUtilityRates}. Agent response time: ${listing.agentResponseTime}min. Return ONLY a number.`,
        'You are a listing quality assessor. Return only a single number 0-100.'
    );
    const score = parseInt(response.trim());
    return isNaN(score) ? 50 : Math.min(100, Math.max(0, score));
}

/** Suggest ad headline improvements */
export async function suggestAdHeadline(original: string, zone: string): Promise<string[]> {
    const response = await aiComplete(
        `Suggest 3 better ad headlines for zone "${zone}" on a Cambodia rental platform. Original: "${original}". Return 3 alternatives, one per line, each under 60 chars. No numbering.`,
        'You are an advertising copywriter specializing in Cambodia real estate.'
    );
    return response.split('\n').filter(l => l.trim()).slice(0, 3);
}

/** Smart notification matching */
export async function matchNotification(userPrefs: {
    budget: string;
    bedrooms: string;
    district: string;
}, listing: {
    title: string;
    price: number;
    district: string;
}): Promise<string> {
    return aiComplete(
        `Write a brief push notification (under 100 chars) for a user who prefers ${userPrefs.budget} budget, ${userPrefs.bedrooms}, in ${userPrefs.district}. New listing: "${listing.title}" at $${listing.price}/mo in ${listing.district}.`,
        'You are a notification writer. Be concise and compelling. Include emoji.'
    );
}
