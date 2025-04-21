'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  animationKey: string | number;
  className?: string
}

export default function TransitionWrapper({ children, animationKey, className = '' }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}