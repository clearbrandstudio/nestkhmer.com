/* ─── JSON-LD Structured Data Components ─── */

interface OrganizationSchemaProps {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
}

export function OrganizationJsonLd({
    name = 'NestKhmer',
    url = 'https://nestkhmer.com',
    logo = 'https://nestkhmer.com/logo.png',
    description = 'Cambodia\'s rental intelligence platform. Every listing is maximum 14 days old.',
}: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        description,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Phnom Penh',
            addressCountry: 'KH',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@nestkhmer.com',
            telephone: '+85512345678',
            contactType: 'customer service',
            availableLanguage: ['English', 'Khmer', 'Mandarin'],
        },
        sameAs: [
            'https://t.me/nestkhmer',
            'https://facebook.com/nestkhmer',
            'https://instagram.com/nestkhmer',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface RealEstateListingSchemaProps {
    title: string;
    description: string;
    price: number;
    currency?: string;
    address: string;
    district: string;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    size: number;
    agent: {
        name: string;
        agency: string;
    };
    url: string;
}

export function RealEstateListingJsonLd({
    title,
    description,
    price,
    currency = 'USD',
    address,
    district,
    images,
    bedrooms,
    bathrooms,
    size,
    agent,
    url,
}: RealEstateListingSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Apartment',
        name: title,
        description,
        url,
        image: images,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: district,
            addressRegion: 'Phnom Penh',
            addressCountry: 'KH',
        },
        numberOfRooms: bedrooms,
        numberOfBathroomsTotal: bathrooms,
        floorSize: {
            '@type': 'QuantitativeValue',
            value: size,
            unitCode: 'MTK',
        },
        offers: {
            '@type': 'Offer',
            price,
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price,
                priceCurrency: currency,
                unitText: 'MONTH',
            },
        },
        broker: {
            '@type': 'RealEstateAgent',
            name: agent.name,
            worksFor: {
                '@type': 'Organization',
                name: agent.agency,
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbSchemaProps {
    items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface FAQSchemaProps {
    questions: { question: string; answer: string }[];
}

export function FAQJsonLd({ questions }: FAQSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
