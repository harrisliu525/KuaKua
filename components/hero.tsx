'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center space-y-6">
        <motion.h1 
          className="text-3xl md:text-5xl font-serif font-semibold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          高情商<span className="text-honey-accent">夸奖</span>生成器
        </motion.h1>
        
        <motion.p 
          className="max-w-[600px] mx-auto text-lg text-honey-text/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          输入对象和场景，一键生成走心又高级的夸奖内容，让你的赞美更加专业、真诚
        </motion.p>
        
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="inline-flex items-center rounded-full bg-honey-highlight px-4 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-honey-accent mr-2"></div>
            <span className="text-honey-text/80">27种夸奖技法，打造专业、走心的赞美</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}