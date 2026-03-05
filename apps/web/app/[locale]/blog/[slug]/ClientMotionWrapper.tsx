'use client';
import { motion } from 'framer-motion';

export function ClientMotionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {children}
        </motion.div>
    );
}
