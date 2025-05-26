'use client';

import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-honey-accent/10 bg-honey-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeartHandshake className="h-6 w-6 text-honey-accent" />
          <span className="font-serif text-xl font-semibold text-honey-text">小嘴儿抹了蜜</span>
        </motion.div>
        <div className="ml-auto flex items-center gap-4">
          <motion.a 
            href="#about" 
            className="text-sm font-medium text-honey-text hover:text-honey-accent transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            关于
          </motion.a>
          <motion.a 
            href="#how" 
            className="text-sm font-medium text-honey-text hover:text-honey-accent transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            怎么用
          </motion.a>
        </div>
      </div>
    </header>
  );
}