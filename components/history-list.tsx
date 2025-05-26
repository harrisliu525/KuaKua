'use client';

import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { FormValues } from '@/lib/types';

interface HistoryListProps {
  history: FormValues[];
  onSelect: (item: FormValues) => void;
}

export function HistoryList({ history, onSelect }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-honey-accent" />
        <h3 className="text-sm font-medium">最近使用</h3>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="snap-start flex-none honey-card bg-white min-w-[200px] hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group"
          >
            <div className="truncate">
              <div className="font-medium truncate">{item.target}</div>
              <div className="text-xs text-honey-text/60 truncate">
                {item.scenario || '无场景'}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-honey-text/40 group-hover:text-honey-accent transition-colors" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}