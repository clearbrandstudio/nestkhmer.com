// NestKhmer UI Design System
// Shared components will be added here as the design system grows

export function Button({
    children,
    variant = 'primary',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
}) {
    const styles: Record<string, React.CSSProperties> = {
        primary: {
            background: 'var(--color-brand-600)',
            color: 'white',
            border: 'none',
            padding: '0.625rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all var(--duration-normal) var(--ease-smooth)',
        },
        secondary: {
            background: 'transparent',
            color: 'var(--color-surface-700)',
            border: '1px solid var(--color-surface-200)',
            padding: '0.625rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all var(--duration-normal) var(--ease-smooth)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-brand-600)',
            border: 'none',
            padding: '0.5rem 1rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all var(--duration-normal) var(--ease-smooth)',
        },
    };

    return (
        <button style= { styles[variant]} {...props }>
            { children }
            </button>
  );
}
