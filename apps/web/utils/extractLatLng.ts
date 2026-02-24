/**
 * Utility to extract Latitude and Longitude from a Google Maps URL.
 * Supports both long URLs (google.com/maps/...) and short URLs (maps.app.goo.gl/...)
 * 
 * Usage context: We can use this in a Next.js Server Action when agents submit a listing.
 */

export async function extractLatLngFromGoogleMapsUrl(url: string): Promise<{ lat: number; lng: number } | null> {
    try {
        let finalUrl = url;

        // If it's a short URL, we need to fetch it to get the redirected long URL
        if (url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
            const response = await fetch(url, {
                method: 'GET',
                redirect: 'follow', // Follow the redirect to get the full URL
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            finalUrl = response.url; // The resolved URL
        }

        // Regex to find the @lat,lng pattern in the resolved URL
        // Example: .../@11.5540,104.9280,15z... or ...&ll=11.5540,104.9280...

        // 1. Try matching the standard @lat,lng format
        const atRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const atMatch = finalUrl.match(atRegex);

        if (atMatch && atMatch.length >= 3) {
            return {
                lat: parseFloat(atMatch[1]),
                lng: parseFloat(atMatch[2])
            };
        }

        // 2. Try matching query parameters like &ll=lat,lng
        const llRegex = /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/;
        const llMatch = finalUrl.match(llRegex);

        if (llMatch && llMatch.length >= 3) {
            return {
                lat: parseFloat(llMatch[1]),
                lng: parseFloat(llMatch[2])
            };
        }

        // 3. Fallback: Parse the entire HTML body just in case it's embedded in the meta tags
        if (url.includes('maps.app.goo.gl')) {
            const html = await fetch(url).then(res => res.text());
            const metaRegex = /content="https:\/\/maps\.google\.com\/maps\/api\/staticmap\?center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/;
            const metaMatch = html.match(metaRegex);
            if (metaMatch && metaMatch.length >= 3) {
                return {
                    lat: parseFloat(metaMatch[1]),
                    lng: parseFloat(metaMatch[2])
                };
            }
        }

        return null;

    } catch (error) {
        console.error("Failed to extract coordinates from Google Maps URL:", error);
        return null;
    }
}
