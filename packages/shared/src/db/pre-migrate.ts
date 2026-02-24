import { db } from './index';
import { sql } from 'drizzle-orm';

async function main() {
    console.log('Running pre-migration type casting...');
    try {
        await db.execute(sql`ALTER TABLE agents ALTER COLUMN user_id TYPE varchar(36) USING user_id::varchar;`);
        console.log('Successfully altered agents.user_id to varchar(36)');
    } catch (e: any) {
        console.log('agents.user_id cast skipped or already applied:', e.message);
    }

    try {
        await db.execute(sql`ALTER TABLE blog_posts ALTER COLUMN author_id TYPE varchar(36) USING author_id::varchar;`);
        console.log('Successfully altered blog_posts.author_id to varchar(36)');
    } catch (e: any) {
        console.log('blog_posts.author_id cast skipped or already applied:', e.message);
    }

    console.log('Pre-migration complete.');
    process.exit(0);
}

main();
