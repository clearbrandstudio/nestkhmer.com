'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Code, Maximize2, Minimize2 } from 'lucide-react';

interface CustomHtmlBlockProps {
    /** Raw HTML/CSS/JS content to render */
    html: string;
    /** Optional title for the block */
    title?: string;
    /** Optional minimum height in pixels */
    minHeight?: number;
}

/**
 * CustomHtmlBlock — Renders arbitrary HTML/CSS/JS inside a sandboxed iframe.
 * 
 * Usage in blog content:
 * ```
 * <!-- custom-html title="Interactive Chart" -->
 * <style>body { font-family: sans-serif; background: #1a1a2e; color: white; }</style>
 * <h1>Hello Custom World</h1>
 * <script>console.log('runs safely in sandbox');</script>
 * <!-- /custom-html -->
 * ```
 * 
 * The iframe is sandboxed — scripts run but cannot access the parent window,
 * navigate away, or read cookies. CSS is fully isolated.
 */
export function CustomHtmlBlock({ html, title, minHeight = 200 }: CustomHtmlBlockProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeHeight, setIframeHeight] = useState(minHeight);
    const [expanded, setExpanded] = useState(false);
    const [showSource, setShowSource] = useState(false);

    // Build full HTML document for the iframe
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 24px;
            overflow: auto;
        }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
${html}
<script>
    // Auto-resize: send height to parent
    function sendHeight() {
        const h = Math.max(document.body.scrollHeight, document.body.offsetHeight, ${minHeight});
        window.parent.postMessage({ type: 'nestkhmer-htmlblock-resize', height: h }, '*');
    }
    window.addEventListener('load', sendHeight);
    new ResizeObserver(sendHeight).observe(document.body);
    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 500);
</script>
</body>
</html>`;

    // Listen for resize messages from the iframe
    const handleMessage = useCallback((e: MessageEvent) => {
        if (e.data?.type === 'nestkhmer-htmlblock-resize' && typeof e.data.height === 'number') {
            setIframeHeight(Math.max(e.data.height + 8, minHeight));
        }
    }, [minHeight]);

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [handleMessage]);

    const srcDoc = fullHtml;

    return (
        <div className="my-8 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-surface-200)', background: 'var(--color-surface-50)' }}>
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid var(--color-surface-200)', background: 'white' }}>
                <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" style={{ color: 'var(--color-brand-500)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-surface-600)' }}>
                        {title || 'Custom HTML Block'}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setShowSource(!showSource)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors"
                        style={{ color: 'var(--color-surface-500)', background: showSource ? 'var(--color-surface-100)' : 'transparent' }}
                    >
                        <Code className="w-3 h-3" /> Source
                    </button>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors"
                        style={{ color: 'var(--color-surface-500)' }}
                    >
                        {expanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                    </button>
                </div>
            </div>

            {/* Content */}
            {showSource ? (
                <pre className="p-4 overflow-x-auto text-xs leading-relaxed" style={{ color: 'var(--color-surface-700)', background: 'var(--color-surface-50)', maxHeight: '400px' }}>
                    <code>{html}</code>
                </pre>
            ) : (
                <iframe
                    ref={iframeRef}
                    srcDoc={srcDoc}
                    sandbox="allow-scripts"
                    className="w-full border-0 transition-all"
                    style={{
                        height: expanded ? '80vh' : `${iframeHeight}px`,
                        minHeight: `${minHeight}px`,
                        background: 'white',
                    }}
                    title={title || 'Custom HTML Block'}
                />
            )}
        </div>
    );
}

/**
 * Parse blog content for custom HTML blocks.
 * 
 * Finds blocks delimited by:
 *   <!-- custom-html title="Optional Title" -->
 *   ...html content...
 *   <!-- /custom-html -->
 * 
 * Returns an array of segments: { type: 'text' | 'html', content: string, title?: string }
 */
export function parseCustomHtmlBlocks(content: string): Array<{ type: 'text' | 'html'; content: string; title?: string }> {
    const segments: Array<{ type: 'text' | 'html'; content: string; title?: string }> = [];
    const regex = /<!-- custom-html(?:\s+title="([^"]*)")?\s*-->([\s\S]*?)<!-- \/custom-html -->/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        // Add text before this block
        if (match.index > lastIndex) {
            const text = content.slice(lastIndex, match.index).trim();
            if (text) segments.push({ type: 'text', content: text });
        }
        // Add the custom HTML block
        segments.push({ type: 'html', content: match[2].trim(), title: match[1] || undefined });
        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    const remaining = content.slice(lastIndex).trim();
    if (remaining) segments.push({ type: 'text', content: remaining });

    return segments;
}
