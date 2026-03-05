import { db, schema } from '@nestkhmer/shared';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ChevronLeft, Share2 } from 'lucide-react';
import { ClientMotionWrapper } from './ClientMotionWrapper';

export default async function BlogPostPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const { locale, slug } = params;

  // 1. Fetch post from Drizzle
  const [p] = await db.select().from(schema.blogPosts)
    .where(eq(schema.blogPosts.slug, slug))
    .limit(1);

  if (!p) {
    notFound();
  }

  // Parse content blocks from JSON stored in contentEn
  let blocks: any[] = [];
  try {
    blocks = JSON.parse(p.contentEn || '[]');
    if (!Array.isArray(blocks)) {
      blocks = [{ id: '1', type: 'text', content: p.contentEn }];
    }
  } catch (e) {
    blocks = [{ id: '1', type: 'text', content: p.contentEn }];
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '6rem', background: 'var(--color-surface-50)' }}>
      <article className="section-container pt-8 pb-32 max-w-3xl mx-auto">
        <a href={`/${locale}/blog`} className="flex items-center gap-1 text-sm no-underline mb-6 font-medium" style={{ color: 'var(--color-brand-600)' }}><ChevronLeft className="w-4 h-4" /> Back to Blog</a>

        <ClientMotionWrapper>
          <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4" style={{ background: 'var(--color-brand-50)', color: 'var(--color-brand-600)' }}>{p.category || 'Platform'}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{p.titleEn}</h1>
          <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--color-surface-400)' }}>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 min read</span>
            <button className="flex items-center gap-1 ml-auto" style={{ color: 'var(--color-surface-400)' }}><Share2 className="w-4 h-4" />Share</button>
          </div>

          {p.ogImage && (
            <div className="rounded-2xl overflow-hidden mb-8 h-80 bg-cover bg-center" style={{ backgroundImage: `url(${p.ogImage})` }} />
          )}

          <div className="prose max-w-none space-y-6 text-base leading-relaxed" style={{ color: 'var(--color-surface-700)' }}>
            {blocks.map((block: any) => {
              if (block.type === 'heading') return <h2 key={block.id} className="text-2xl font-bold mt-8 mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-surface-900)' }}>{block.content}</h2>;
              if (block.type === 'text') return <p key={block.id}>{block.content}</p>;
              if (block.type === 'image') return <img key={block.id} src={block.content} alt="Content image" className="rounded-2xl w-full h-auto mb-6" />;
              return null;
            })}
          </div>
        </ClientMotionWrapper>
      </article>
    </div>
  );
}
