import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use(
    '*',
    cors({
        origin: ['http://localhost:3000', 'https://nestkhmer.com'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
    })
);

// Health check
app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        service: 'nestkhmer-api',
        timestamp: new Date().toISOString(),
        version: '0.1.0',
    });
});

// API v1 placeholder
app.get('/api/v1', (c) => {
    return c.json({
        message: 'NestKhmer API v1',
        docs: '/api/v1/docs',
    });
});

// Start server
const port = parseInt(process.env.PORT || '3001');
console.log(`🏠 NestKhmer API running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
