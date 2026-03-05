import { getBlogPostById } from './actions';
import EditorClient from './EditorClient';

export const dynamic = 'force-dynamic';

export default async function PageEditorServer(props: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ id?: string }>;
}) {
    const searchParams = await props.searchParams;
    const { id } = searchParams;

    let initialData = null;

    if (id) {
        const res = await getBlogPostById(id);
        if (res.success) {
            initialData = res.post;
        }
    }

    return <EditorClient initialData={initialData} />;
}
