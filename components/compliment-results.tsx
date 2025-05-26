'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Compliment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ComplimentResultsProps {
  target: string;
  scenario: string;
  compliments: Compliment[];
}

export function ComplimentResults({ target, scenario, compliments }: ComplimentResultsProps) {
  const { toast } = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: '已复制',
      description: '夸奖内容已复制到剪贴板',
    });
    
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8 mb-12" 
      variants={container} 
      initial="hidden" 
      animate="show"
    >
      <div className="honey-card bg-honey-highlight border-honey-accent/20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
          <h2 className="text-2xl font-serif font-semibold">夸奖结果</h2>
          <div className="text-honey-text/70 text-sm">
            <span className="font-medium">对象：</span>{target} | 
            <span className="font-medium"> 场景：</span>{scenario}
          </div>
        </div>
        
        <div className="space-y-6">
          {compliments.map((compliment, index) => (
            <motion.div 
              key={index} 
              className="honey-card bg-white border-honey-accent/10"
              variants={item}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-honey-accent/10 text-honey-accent w-6 h-6 rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div className="text-xs px-2 py-1 bg-honey-accent/10 text-honey-accent rounded-full">
                    {compliment.technique}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(compliment.content, index)}
                  className="text-honey-text/50 hover:text-honey-accent transition-colors"
                  aria-label="复制夸奖内容"
                >
                  {copiedIndex === index ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <p className="text-lg mb-4 font-serif">{compliment.content}</p>
              
              <div className="bg-honey-background/50 p-3 rounded-lg text-sm text-honey-text/80">
                <div className="font-medium text-honey-text mb-1">夸奖逻辑与思路：</div>
                <p>{compliment.logic}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}